/*
 * Query Legend
 * Requirements: GeoServer WMS running - "http://localhost:8080/geoserver/cite/wms"
 *               openlayers JS reference file (local or server) - OpenLayers-2.13.1/OpenLayers.js
 * 
 * Author: Sawyer Stippa
 * Company: USGS
 * email: sstippa@usgs.gov
 * 
 */

var qList = document.getElementsByClassName('q');

function initColor() {
    for (var i =0;i<qList.length;i++) {
        if (qList[i].className.indexOf(' bea ' ) == -1) {
            qList[i].style.backgroundColor = 'white';
            qList[i].style.border = '1px solid lightgray';
        }
    }   
}

function clearAll() {
    for (var i =0;i<qList.length;i++) {
        qList[i].style.backgroundColor = 'white';  
    }
    var years = ['20','30','50','80'];
    for (var year=0;year<years.length;year++) {
                xmlClear = '<?xml version="1.0" encoding="ISO-8859-1"?>'+'<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">' + '<NamedLayer>' +'<Name>' + 'crd'+years[year]+'_prj' + '</Name>' +'<UserStyle>' + '<FeatureTypeStyle>' +'<Rule>' +'<RasterSymbolizer>' +'<Opacity>' + '1.0' + '</Opacity>' +'<ColorMap type="Values">' +'<ColorMapEntry color="#000000" quantity="0.0" label="nodata" opacity="0.0" />' + '</ColorMap>' +'</RasterSymbolizer>' +'</Rule>' +'</FeatureTypeStyle>' +'</UserStyle>' +'</NamedLayer>' +'</StyledLayerDescriptor>'
                window['crd'+years[year]].mergeNewParams({ sld_body: xmlClear });
    }
}

function colorPick2(p) {
    if (p.style.backgroundColor != 'white') {
	p.style.backgroundColor = 'white';
    } else {
	p.style.backgroundColor = '';
    }
}
function gPick(gp) {
    var names = ['Subaqueous','Marsh','Beach','Rocky','Forest','Developed','Unlikely (0-33%)','About as likely as not (33-66%)','Likely (66-90%)','Very likely (90-100%)'];
    for (var name =0;name<names.length;name++) {   
        if (gp.innerHTML == names[name]) { 
            var cn = names[name].substr(0,3).toLowerCase();
            var list = document.getElementsByClassName(cn)
            for (var i=0;i<list.length;i++) {
                list[i].style.backgroundColor = '';
            }
        } 
    }
    setStyle();
}