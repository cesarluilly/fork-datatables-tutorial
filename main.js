//  Almacenar la Datatable
let dataTable;

//  Saber si la variable si ha sido inicializada o no.
//  Esto porque cuando nosotros necesitamos recrear la tabla, 
//      y cuando queremos cargar de nuevo datos, hay que destruirla.
let dataTableIsInitialized = false;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],

    columnDefs: [
        //  Configuracion de columnas, y especificamos la columna que apicara 
        //  el estilo en este caso
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        //  Ponermos configuracion de si es ordenable
        { orderable: false, targets: [5, 6] },

        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    //  Indicar que es una tabla Destruible.
    destroy: true,
    //  Cambiamos el idioma, ya que datable todo lo muestra en ingles, 
    //  lo que empieza con _ como _MENU_ etc. son variables para reemplarlo despues.
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

// Inicializar la tabla.
const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    //  Recibe objetos de configuracion.
    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        let content = ``;
        users.forEach((user, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.address.city}</td>
                    <td>${user.company.name}</td>
                    <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                    <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
        });
        tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});

let searchCes = document.getElementById("searchCes");
console.log(searchCes);



