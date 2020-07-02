let body = document.querySelector("body");
let menu = document.getElementById("menu");
let propina = document.getElementById("propina");
let button = document.getElementById("button");
let imgHuevos = "imagenes/huevos.jpg";
let imgFruta = "imagenes/fruta.jpg";
let imgHotCakes = "imagenes/hotCakes.jpg";
const menuImage = document.getElementById('menuImage');

let menuItemId;

menu.addEventListener('change', e => {
    menuItemId = menu.options[menu.selectedIndex].id;
    menuImage.src=creaImagen(menuItemId)
}  )

let preciosMenu = {
    fruta: 15,
    huevos: 20,
    hotCakes: 35,

    precioDelPedido: function() {
    let plId = menu.options[menu.selectedIndex].id;
    let precio;
    if (plId == "huevos"){
        precio = this.huevos;
    } else if (plId == "fruta") {
        precio = this.fruta;
    } else if (plId == "hotCakes") {
        precio = this.hotCakes;
    }
    return precio;
    }
};

let objMenu = {
    fruta: {
        precio: 15,
        imagen: "imagenes/fruta.jpg"
    },
    huevos: {
        precio: 20,
        imagen: "imagenes/huevos.jpg"
    },
    hotCakes: {
        precio: 35,
        imagen: "imagenes/hotCakes.jpg"
    }
}


let calcPropina = function(precio) {
    var porcentaje = propina.options[propina.selectedIndex].value;
    var prop = precio * porcentaje;
    return prop;
}

let calcTotal = function () {
    let precio = preciosMenu.precioDelPedido();
    let propina = calcPropina(precio);
    return precio + propina;

}

let creaImagen = function(item) {
    
    if (document.getElementById('cuenta') !== null) {
        document.getElementById('cuenta').remove();
        document.getElementById("menuImage").classList.remove("transparente")
    }
    document.getElementById("menu-image-container").setAttribute("style", "display: block")
    let menuImage;
    if (item == "huevos") {
        menuImage = objMenu.huevos.imagen
    } else if (item == "fruta") {
        menuImage = objMenu.fruta.imagen
    } else if (item == "hotCakes") {
        menuImage = objMenu.hotCakes.imagen
    }
    
    return menuImage

}

let hacerPedido = function() {
    if (document.getElementById('cuenta') !== null) {
        document.getElementById('cuenta').remove();
    }
    if (!(menu.options[menu.selectedIndex].value == "0")) {
        let platillo = menu.options[menu.selectedIndex].value;
        let precio = preciosMenu.precioDelPedido();
        let total = calcTotal(); 
        let strPropina = propina.options[propina.selectedIndex].value * 100 + "%";
        let cuenta = function () {
            div = document.getElementById("menu-image-container")
            let p = document.createElement('p');
            p.setAttribute('id', 'cuenta')
            p.innerHTML =
                `Platillo: ${platillo} <br/>
                Precio: $${precio} <br/>
                Propina: ${strPropina} <br/>
                Total: $${total} `;
            
            document.getElementById("menu-image-container").classList.add("black-background")
            document.getElementById("menuImage").classList.add("transparente")
            div.append(p)
        }
        return cuenta()
    }
}


button.addEventListener("click", hacerPedido);
