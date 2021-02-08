// https://github.com/valeryburtsev

class Graph {
    constructor() {
        this.length = 0;
        this.vertices = {}
    }

    findVertex(src) {
        for(const key in this.vertices) {
            let vertex = this.vertices[key]
            if(vertex.src === src) return vertex
        }
        return null
    }
    getVertex(src) {
        const vertex = this.findVertex(src)
        if(vertex) return vertex;
        let v = {src: src, destinations: []}
        this.vertices[src] = v;
        this.length++;
        return v

    }
    getEdges() {
        let edges = []
        for(const key in this.vertices) {
            const vertex = this.vertices[key]
            edges = [...edges, ...vertex.destinations]
        }

        return edges;
    }
    addEdge(src, dest, cost, bi=false) {
        let s = this.getVertex(src)
        let d = this.getVertex(dest)
        s = {...s, destinations: [...s.destinations, {src:src, dest:dest, cost:cost}]}
        this.vertices[src] = s

        if(bi) {
            d = {...d, destinations: [...d.destinations, {src:dest, dest:src, cost:cost}]}
            this.vertices[dest] = d
        }
    }

    getPrimMST(start_vertex) {
        const start = this.findVertex(start_vertex)
        if(!start) return console.log("Start vertex is not found in the graph")

        let visited = []
        let mst = []

        visited.push(start.src)

        while(visited.length < this.length) {
            let dest_available = []
            for(const key in visited) {
                const v = this.findVertex(visited[key])
                for(let k in v.destinations) dest_available.push(v.destinations[k])
            }

            let min_edge = null
            for(const k in dest_available) {
                const d = dest_available[k]
                if(visited.indexOf(d.dest) !== -1) continue;
                if(!min_edge) min_edge = d;
                if(min_edge.cost > d.cost) min_edge = d;
            }

            if(!min_edge) break;
            mst.push(min_edge)
            visited.push(min_edge.dest)

        }
        
        console.log(`Minimum spanning tree (Prim's algorithm):`)
        let total_cost = 0
        for(const key in mst) {
            console.log(`   * From ${mst[key].src} to ${mst[key].dest} (cost ${mst[key].cost})`)
            total_cost += mst[key].cost
        }
        console.log(`Total cost: ${total_cost}`)

    }

    getDijkstraMST(start_vertex) {
        const start = this.findVertex(start_vertex)
        if(!start) return console.log("Start vertex is not found in the graph")

        let edges = []
        let vertices = {}
        let visited = []
        let mst = []

        for(const key in this.vertices) {
            const vertex = this.vertices[key]
            edges = [...edges, ...vertex.destinations]

            if(vertex.src !== start.src)
                vertices[vertex.src] = Number.MAX_SAFE_INTEGER;
        }

        visited.push(start.src)

        while(visited.length < this.length) {
            for(const key in visited) {
                const v = this.findVertex(visited[key])
                const destinations = v.destinations
                for(const key in destinations) {
                    const d = destinations[key]
                    if(visited.indexOf(d.dest) !== -1) continue;
                    const curr_cost = d.src === start.src ? 0 : vertices[d.src]
                    const dest_cost = curr_cost + d.cost
                    if(vertices[d.dest] > dest_cost) vertices[d.dest] = dest_cost
                }
            }

            let smallestVal = Number.MAX_SAFE_INTEGER
            let goTo = null
            for(const key in vertices) {
                if(visited.indexOf(key) !== -1) continue;
                if(vertices[key] < smallestVal) {
                    smallestVal = vertices[key]
                    goTo = key
                }
            }

            if(!goTo) break;
            
            let findDest = []
            for(const key in edges) {
                const edge = edges[key]
                if(edge.dest === goTo) {
                    /* mst.push(edge)
                    visited.push(edge.dest)
                    break; */
                    findDest.push(edge)
                }
            }


            let shortestDest = {cost:Number.MAX_SAFE_INTEGER}
            for(const key in findDest) {
                const edge = findDest[key]
                if(shortestDest.cost > edge.cost && visited.indexOf(edge.src) > -1) shortestDest = edge
            }

            mst.push(shortestDest)
            visited.push(shortestDest.dest)

            
        }
        console.log(vertices)
        console.log(mst)
        
    }

    getKruskalMST() {
        let edges = []
        let vertices = {}
        let mst = []

        for(const key in this.vertices) {
            const vertex = this.vertices[key]
            edges = [...edges, ...vertex.destinations]

            vertices[vertex.src] = {parent: vertex.src, rank: 1}
        }

        edges.sort((a, b) => (a.cost > b.cost) ? 1 : -1)

        function find(a) {
            if(vertices[a].parent != a) {
                return find(vertices[a].parent)
            }
            return a
        }

        function union(a, b) {
            const parent1 = vertices[find(a)]
            const parent2 = vertices[find(b)]
            if(parent1.parent !== parent2.parent) {
                if(parent1.rank < parent2.rank) {
                    parent1.parent = parent2.parent
                } else {
                    parent2.parent = parent1.parent
                    if (parent1.rank === parent2.rank) parent1.rank++;
                }
            }

        }

        for(const key in edges) {
            const edge = edges[key]

            if(find(edge.src) !== find(edge.dest)) {
                mst.push(edge)
                union(edge.src, edge.dest)
            }
        }

        //console.log(mst)

        console.log(`Minimum spanning tree (Kruskal's algorithm):`)
        let total_cost = 0
        for(const key in mst) {
            console.log(`   * From ${mst[key].src} to ${mst[key].dest} (cost ${mst[key].cost})`)
            total_cost += mst[key].cost
        }
        console.log(`Total cost: ${total_cost}`)
    }

    printGraph() {
        console.log("Printing graph:")
        for(let key in this.vertices) {
            let v = this.vertices[key]
            if(v.destinations.length > 0) {
                console.log(`Vertex ${v.src} has these edges:`)
                for(let key in v.destinations) {
                    let d = v.destinations[key]
                    console.log(`   * edge to ${d.dest} (cost ${d.cost})`)
                }
            }
        }
    }
}



const main = () => {
    console.log("Creating a graph in JavaScript")

    let g = new Graph();
    g.addEdge("S", "A", 0)
    g.addEdge("A", "B", 2, true)
    g.addEdge("A", "D", 3, true)
    g.addEdge("A", "C", 3, true)
    g.addEdge("B", "C", 4, true)
    g.addEdge("B", "E", 3, true)
    g.addEdge("C", "D", 5, true)
    g.addEdge("C", "F", 6, true)
    g.addEdge("C", "E", 1, true)
    g.addEdge("D", "F", 7, true)
    g.addEdge("E", "F", 8, true)
    g.addEdge("F", "G", 9, true) 

    //g.printGraph()
    
    g.getDijkstraMST("S")
    //g.getPrimMST(0)
    //g.getKruskalMST()
}

main()