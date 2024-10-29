function inicializartabla() {
    const datatablesSimple = document.getElementById('datatablesSimple')
    //datatablesSimple.destroy()
    if (datatablesSimple) {
        const datatable = new simpleDatatables.DataTable(datatablesSimple);
    }
}