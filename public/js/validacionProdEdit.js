window.onload = function(){

    let formularioedicionProd = document.querySelector('form.edicionProd')
    let nombre = document.querySelector('#nombreProducto')
    let descripcion = document.querySelector('#descripcionProducto')
    let allowedExtension = ['jpeg', 'jpg', 'png', 'gif'];
    let fileExtension = document.getElementById('imagenProducto').value.split('.').pop().toLowerCase()
    
    let arrayError =[]
        
    formularioedicionProd.addEventListener('submit', (e) => {

        arrayError = []
       
        if(nombre.value == ""){
            arrayError.push('El campo nombre es obligatorio.');
            e.preventDefault()
        } else if (nombre.value.length < 5){
            arrayError.push('El nombre debe tener al menos 5 caracteres.');
            e.preventDefault()
        }

        if(descripcion.value == ""){
            arrayError.push('El campo descripcion es obligatorio.');
            e.preventDefault()
        } else if (descripcion.value.length < 20){
            arrayError.push('La descripcion debe tener al menos 20 caracteres.');
            e.preventDefault()
        }

        if (allowedExtension.indexOf(fileExtension) == -1) {
            arrayError.push('El formato de la imagen cargada no es válido.');
            e.preventDefault()
        }
                
            let erroresEditProd = document.querySelector('.erroresEditProd')

            if (arrayError.length > 0) {
                e.preventDefault()
                erroresEditProd.innerHTML = ''
                for (let error of arrayError) {
                    erroresEditProd.innerHTML += `<li>${error}</li>`
                }
            }
    
        })

}