import requests
from bs4 import BeautifulSoup

url = 'https://therarbg.com/get-posts/keywords:1080p:category:Movies:time:60D/'

response = requests.get(url)
html_content = response.content

soup = BeautifulSoup(html_content, 'html.parser')

tabla = soup.find('table')
cuerpo_tabla = tabla.find('tbody')

urls_peliculas = []

for fila in cuerpo_tabla.find_all('tr'):
    celdas = fila.find_all('td')

    for celda in celdas:
        div = celda.find('div')
        enlace = div.find('a') if div else None

        if enlace:
            nombre_pelicula = enlace.text.strip()
            print(nombre_pelicula)
            parte_url = enlace['href']
            urls_peliculas.append(parte_url)
            print(urls_peliculas)
