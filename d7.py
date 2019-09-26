import networkx as nx

G = nx.DiGraph()
with open('7.input', 'r') as f:
    for line in f:
        parts = line.split(" ")
        G.add_edge(parts[1], parts[7])
print(''.join(nx.lexicographical_topological_sort(G)))

