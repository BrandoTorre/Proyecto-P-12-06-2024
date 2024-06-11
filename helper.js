const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    
    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
    } else {
        input.classList.add('is-valid')
        if (id === 'fecha') {
            if (validarFecha(input.value)){
                input.classList.add('is-invalid')
            }
        }
        if (id === 'codigo') {
            if (!input.value.includes('-')) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El guion es obligatorio</span>';
            }
        }
    }
};

const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
    });
    document.querySelectorAll('.form-check-input').forEach(items => {
        items.classList.remove('is-valid')
        items.classList.remove('is-envalid')
    })
};

const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    return fecha > hoy
}

const validarCod = (codigo) => {
    const codigoPattern = /^\d{2,3}-\d{3}$/;
    return codigoPattern.test(codigo);
};
