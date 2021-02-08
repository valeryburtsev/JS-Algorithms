class BST {
    constructor() {
        this.length = 0;
        this.tree = null
        this.traverseArr = []
    }

    insertBST(item) {
        //const item = String(i)
        if(this.tree === null) {
            this.tree = {item:item, left:null, right:null}
            this.length++;
            return;
        }

        const newItem = {item:item, left:null, right:null}
        this._findInsert(this.tree, newItem)
    } 

    _findInsert(root, item) {
        if(item.item < root.item) {
            if(root.left) {
                this._findInsert(root.left, item)
            } else {
                root.left = item
                this.length++
            }
            return;
        }

        if(item.item > root.item || item.item === root.item) {
            if(root.right) {
                this._findInsert(root.right, item)
            } else {
                root.right = item
                this.length++
            }
            return
        }
    }

    _checkNodePreOrder(node) {
        this.traverseArr.push(node)

        if(node.left) {
            this._checkNodePreOrder(node.left)
        }
        if(node.right) {
            this._checkNodePreOrder(node.right)
        }
    }

    _checkNodePostOrder(node) {
        if(node.left) {
            this._checkNodePostOrder(node.left)
        }
        if(node.right) {
            this._checkNodePostOrder(node.right)
        }
        return this.traverseArr.push(node)
    }

    _checkNodeInOrder(node) {
        if(node.left) {
            this._checkNodeInOrder(node.left)
        }
        this.traverseArr.push(node)
        if(node.right) {
            this._checkNodeInOrder(node.right)
        }
    }

    _checkNodeByLevel(node) {
        let queue = []
        queue.push(node)

        while(queue.length > 0) {
            let n = queue.shift()
            this.traverseArr.push(n)
            if(n.left) {
                queue.push(n.left)
            }
            if(n.right) {
                queue.push(n.right)
            }
        }
    }

    forEach(callback, dir="preorder") {
        this.traverseArr = []
        if(!this.tree) return callback(null);

        switch(dir) {
            case "postorder":
                this._checkNodePostOrder(this.tree)
                break
            case "inorder":
                this._checkNodeInOrder(this.tree)
                break
            case "levelorder":
                this._checkNodeByLevel(this.tree)
                break
            default:
                this._checkNodePreOrder(this.tree)
                break
        }

        for(let i in this.traverseArr) {
            callback(this.traverseArr[i].item)
        }
        this.traverseArr = []
    }

    print() {
        console.log(JSON.stringify(this.tree))
    }

}

const main = () => {
    let t = new BST()
    t.insertBST(3)
    t.insertBST(4)
    t.insertBST(5)
    t.insertBST(2)
    t.insertBST(3)
    t.insertBST(1)
    t.insertBST(8)
    t.insertBST(7)
    t.insertBST(9)
    t.insertBST(10)

    t.forEach(el => {
       console.log(el)
    }, "postorder") 

}
main()