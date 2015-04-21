/*
 * Generate Styled Layer Descriptor (SLD)
 * Requirements: GeoServer WMS running - "http://localhost:8080/geoserver/cite/wms"
 *               openlayers JS reference file (local or server) - OpenLayers-2.13.1/OpenLayers.js
 * 
 * Author: Sawyer Stippa
 * Company: USGS
 * email: sstippa@usgs.gov
 * 
 */
function setStyle(){
    var color, dec, lkList, lkCount, toggles, xml, styles, color, labels, quantity, colorMaps, labelCount, styleCount, yr, years, decName;
    hideAll();
    dec = document.getElementById("slider").value; // The selected slider decade
    
// Make a list of the selected squares, aka toggles
    lkList = []; lkCount = 0;
    toggles=document.getElementsByClassName("q");
    for (var i = 0; i < toggles.length; i++) {
        color = window.getComputedStyle(toggles[i],null).getPropertyValue("background-color")
        if(color != 'rgb(255, 255, 255)'){
            lkList[lkCount] = toggles[i].id;
            lkCount = lkCount + 1
        }
    }
   
    var combList = [
        '<ColorMapEntry color="#045a8d" quantity="1" label="Subaqueous | Likely" />',
        '<ColorMapEntry color="#3399FF" quantity="8" label="Subaqueous | About as likely as not" />',
        '<ColorMapEntry color="#99CCFF" quantity="9" label="Subaqueous | Unlikely"/>',
        '<ColorMapEntry color="#810f7c" quantity="11" label="Marsh | Likely" />',
        '<ColorMapEntry color="#8856a7" quantity="7" label="Marsh | About as likely as not" />',
        '<ColorMapEntry color="#8c96c6" quantity="19" label="Marsh | Unlikely"/>',
        '<ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" />',
        '<ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" />',
        '<ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/>',
        '<ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" />',
        '<ColorMapEntry color="#E65CB8" quantity="16" label="Cliff | Likely" />',
        '<ColorMapEntry color="#EE8DCD" quantity="15" label="Cliff | About as likely as not"/>',
        '<ColorMapEntry color="#F5BEE3" quantity="14" label="Cliff | Unlikely" />',
        '<ColorMapEntry color="#006d2c" quantity="4" label="Forest | Likely" />',
        '<ColorMapEntry color="#2ca25f" quantity="6" label="Forest | About as likely as not"/>',
        '<ColorMapEntry color="#66c2a4" quantity="18" label="Forest | Unlikely"/>',
        '<ColorMapEntry color="#FF0000" quantity="2" label="Developed | Likely" />',
        '<ColorMapEntry color="#FF9999" quantity="3" label="Developed | About as likely as not"/>',
        '<ColorMapEntry color="#FFCCCC" quantity="17" label="Developed | Unlikely" />'  
    ];
    
// Generate list of ColorMapEntry's that correspond with selected toggles 
    styleCount = 0;styles = [];
    for (var l=0;l<lkList.length;l++){
        for (var c=0;c<combList.length;c++) {
            if (combList[c].indexOf(lkList[l])!= -1) {
                styles[styleCount] = combList[c]
                styleCount = styleCount + 1
            } else{}
        }  
    }
  
    colorMaps = styles.join("") //Merge ColorMapEntry's
    
// Generate SLD for EACH decade - if the decade slider is changed, future style scenario will match past style scenario
    years = ['20','30','50','80'];
    for (var year=0;year<years.length;year++) {
         xml = '<?xml version="1.0" encoding="ISO-8859-1"?>'+'<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">' + 
         '<NamedLayer>' +
             '<Name>' + 'crd'+years[year]+'_prj' + '</Name>' +
                 '<UserStyle>' +
                     '<FeatureTypeStyle>' +
                         '<Rule>' +
                             '<RasterSymbolizer>' +
                                 '<Opacity>' + '1.0' + '</Opacity>' +
                                     '<ColorMap type="Values">' +
                                         colorMaps +
                                         '<ColorMapEntry color="#000000" quantity="0.0" label="nodata" opacity="0.0" />' + 
                                     '</ColorMap>' +
                             '</RasterSymbolizer>' +
                         '</Rule>' +
                     '</FeatureTypeStyle>' +
                 '</UserStyle>' +
         '</NamedLayer>' +
     '</StyledLayerDescriptor>'
    window['crd'+years[year]].mergeNewParams({ sld_body: xml}); // Merge new SLD with layer
    }
    
// Show crd that corresponds with selected decade
    if (dec == '1') {crd20.setVisibility(true);}
    else if (dec == '2') {crd30.setVisibility(true);}
    else if (dec == '3') {crd50.setVisibility(true);}
    else if (dec == '4') {crd80.setVisibility(true);} else {}
}