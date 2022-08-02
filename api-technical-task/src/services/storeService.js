
const storeService = () => {
    const store = []

    const add = (data) => {
        store.push(data)
    }

    const getAll = () => {
        return store
    }

    const getBy = (key, value) => {
        return store.find((storeItem) => storeItem[key] === value)
    }

    const reset = () => {
        store.splice(0)
    }

    return {
        add,
        getAll,
        getBy,
        reset
    }
}

module.exports.default = storeService
