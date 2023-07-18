let svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor" /></svg>'


export default class {
    geojson
    tag
    constructor(geojson,tag) {
        this.geojson = geojson
        this.tag = tag

        const info = L.control({position: 'topleft'});

        let search_this = this

        info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'search');
            this._div.addEventListener("mousedown", L.DomEvent.stopPropagation);
            this._div.innerHTML = `<div><input/>${svg}</div><div></div>`;
            let div = this._div.children[1]
            this._div.querySelector("input").addEventListener("input",(e) => search_this.search(e,search_this,div,map))
            return this._div;
        };

        return info
    }

    search(e,ctx,div,map) {
        div.innerHTML = ""
        if (! e.target.value) return


        let filtered = Object.values(ctx.geojson._layers).filter(
            (layer) => layer.feature.properties["name"].toUpperCase().includes(e.target.value.toUpperCase()) 
        )


        for ( let layer of filtered.splice(0,5)){
            let a = document.createElement("a")
            a.style.display="block"

            a.addEventListener("pointerdown",(e) => { map.fitBounds(layer.getBounds()) } ) ;
            a.href="#"
            a.innerText = layer.feature.properties["name"]
            div.appendChild(a)
        }

    }
}
