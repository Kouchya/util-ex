interface MultimapCallback {
    (...args: any[]) : any
}

export function multimap(callback: MultimapCallback, ...array_list: any[][] ): any[] {
    if (callback.length != array_list.length) {
        throw "ArgumentException: The number of arguments of callback differs from that of elements in array_list."
    }

    var res = new Array()
    var current_indices = new Array<number>()
    array_list.forEach((value, index) => {
        current_indices[index] = 0
    })

    var all_full = function(array_list: any[][], indices_list: Array<number>): boolean {
        for (var i = 0; i < array_list.length; i++) {
            if (array_list[i].length > indices_list[i] + 1) {
                return false
            }
        }
        return true
    }

    while (!all_full(array_list, current_indices)) {
        for (var i = 0; i < array_list.length; i++) {
            if (current_indices[i] + 1 < array_list[i].length) {
                current_indices[i]++
                for (var j = 0; j < i; j++) {
                    current_indices[j] = 0
                }
                break
            }
        }
        res.push(callback.call(this, ...current_indices.map((j, i) => {return array_list[i][j]})))
    }

    return res
}