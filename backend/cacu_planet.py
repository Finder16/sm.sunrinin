from bs4 import BeautifulSoup
import requests
import time

url = "http://private-amnesiac-cd3161-astrologyapi.apiary-proxy.com/api/v1/planets"



a = requests.post(url)   
print(a)