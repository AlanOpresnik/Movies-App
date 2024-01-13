import re
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
            parte_url = enlace['href']
            urls_peliculas.append(parte_url)

            pelicula_response = requests.get(f"https://therarbg.com{parte_url}")
            print(f"Parte de la URL de cada pelicula: {pelicula_response.url}")

            pelicula_html = pelicula_response.content
            pelicula_soup = BeautifulSoup(pelicula_html, "html.parser")

            enlace_magnet = pelicula_soup.find("table").find("button").find_all("a")

            if enlace_magnet:
                enlace_magnet_url = enlace_magnet[0].get("href")
                print(f"Enlace Magnet: {enlace_magnet_url}")
                print("=" * 50)


