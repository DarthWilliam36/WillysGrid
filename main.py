import json
import socket
size_x = 15
size_y = 15
grid = []


def alter_grid(pos_x, pos_y, color):
    with open('Grid.json', 'r+') as f:
        data = json.load(f)
        data[str(pos_x)][pos_y] = color
        f.seek(0)
        json.dump(data, f, indent=4)


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('0.0.0.0', 5000))
s.listen(5)
while True:
    print (s.accept()[1])