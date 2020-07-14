class Renderer {
    render = function (data, obj) {
        const source = $(`#${obj}Template`).html()
        const template = Handlebars.compile(source)
        let dataHTML = template({ data })
        $(`#${obj}Container`).empty().append(dataHTML)
    }
}
