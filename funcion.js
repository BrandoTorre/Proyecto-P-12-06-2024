import { anadir, eliminar, aña, actu, dato } from "./firebase.js";

let id = 0; 

document.getElementById('btn-guardar').addEventListener('click', async () => {

    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length === 0) {
        const carta = {
            'codigo': document.getElementById('codigo').value.trim(),
            'nombre': document.getElementById('nombre').value,
            'Tipo': document.getElementById('Tipo').value,
            'fuerza': document.getElementById('fuerza').value,
            'oro': document.getElementById('oro').value,
            'raza': document.getElementById('raza').value,
            'frecu': document.getElementById('frecu').value,
            'edicion': document.querySelector('input[name="edicion"]:checked').value,
            'fecha': document.getElementById('fecha').value
        };
        if (document.getElementById('btn-guardar').value === 'Guardar') {
            const ana = await anadir(carta);
            if (!ana) {
                Swal.fire({
                    title: "Error",
                    text: "Código ya Registrado",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Registrado",
                    text: "Carta Añadida",
                    icon: "success"
                }).then(() => {
                    limpiar();
                });
            }
        } else {
            await actu(id, carta);
            limpiar();
            id = 0; 
            document.getElementById('btn-guardar').value = 'Guardar';
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    dato((collection) => {
        let tabla = '';

        collection.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>${item.Tipo}</td>
                <td>${item.fuerza}</td>
                <td>${item.oro}</td>
                <td>${item.raza}</td>
                <td>${item.frecu}</td>
                <td>${item.edicion}</td>
                <td>${item.fecha}</td>
                <td nowrap>
                    <button class="btn btn-warning editar-btn" data-id="${doc.id}">Editar</button>
                    <button class="btn btn-danger eliminar-btn" data-id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });

        document.getElementById('contenido').innerHTML = tabla;
        document.querySelectorAll('.eliminar-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const result = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "No se revertirán",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                });

                if (result.isConfirmed) {
                    await eliminar(btn.dataset.id);
                    Swal.fire({
                        title: "Eliminado",
                        text: "Registro Eliminado",
                        icon: "success"
                    })
                }
            });
        });
        document.querySelectorAll('.editar-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await aña(btn.dataset.id);
                const d = doc.data();
                document.getElementById('codigo').value = d.codigo;
                document.getElementById('nombre').value = d.nombre;
                document.getElementById('Tipo').value = d.Tipo;
                document.getElementById('fuerza').value = d.fuerza;
                document.getElementById('oro').value = d.oro;
                document.getElementById('raza').value = d.raza;
                document.getElementById('frecu').value = d.frecu;
                document.getElementById('fecha').value = d.fecha;
                const edicion = document.querySelector(`input[name="edicion"][value="${d.edicion}"]`);
                if (edicion) {
                    edicion.checked = true;
                }
                document.getElementById('btn-guardar').value = 'Modificar';
                document.getElementById('codigo').setAttribute('readonly', true);
                id = btn.dataset.id;
            });
        });
    });
});

