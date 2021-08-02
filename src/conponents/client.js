export const getData = () => {
    let a = [];
    try {
        fetch("https://60ef93eaf587af00179d3a4d.mockapi.io/products-redux")
            .then((res) => res.json())
            .then((data) => a = data)
    } catch (error) {
        console.log(error)
    }
    return a
}