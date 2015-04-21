/*
 * Map Initializaion
 * Requirements: GeoServer WMS running - "http://localhost:8080/geoserver/cite/wms"
 *               openlayers JS reference file (local or server) - OpenLayers-2.13.1/OpenLayers.js
 *               Prediction layers - 30m TIFF's projected using EPSG:900913, originally UTM Zone 18N
 * Author: Sawyer Stippa
 * Company: USGS
 * email: sstippa@usgs.gov
 * 
 */
var map;
var crd20; var crd30; var crd40; var crd50; //Dynamic Coastal Response layers
var ae20;var ae30;var ae50;var ae80; //Adjusted Elevation layers
var pae20; var pae30;var pae50; var pae80; // Probability of Adjusted Elevation Layers
var cr20; var cr30; var cr50; var cr80; // Coastal Response Layers 
var arrayOSM; var baseOSM; // Base layers

OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;  // pink tile avoidance
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28; // make OL compute scale according to WMS spec

function init(){
    var lOptions = {singleTile: false,ratio: 1,isBaseLayer: false,transitionEffect: 'resize',visibility: false,} //layer options
    var WMS = "http://localhost:8080/geoserver/cite/wms"; // WMS Path
    var bounds = new OpenLayers.Bounds(-8716543.899842063, 4193322.5335665913,-7416945.398825531, 5883887.784424769); // set extent - taken from crd20 initially

    map = new OpenLayers.Map('map',{controls: [],maxExtent: bounds,}); // Create Map
    
    // Setup Base layer
    var arrayAerial = ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg","http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"];
    
    baseAerial = new OpenLayers.Layer.OSM("MapQuest Open Aerial Tiles", arrayAerial,{opacity:1.0,isBaseLayer:true,});
   
    /* var arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg",
        "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg","http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.jpg"];
    baseOSM = new OpenLayers.Layer.OSM("MapQuest-OSM Tiles", arrayOSM); */
    
    // Setup layers 
    crd20 = new OpenLayers.Layer.WMS("cite:crd20_prj", WMS,{format: 'image/png',transparent: true,
            sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd20_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#045a8d" quantity="1" label="Subaqueous | Likely" /><ColorMapEntry color="#3399FF" quantity="8" label="Subaqueous | About as likely as not" /><ColorMapEntry color="#99CCFF" quantity="9" label="Subaqueous | Unlikely"/><ColorMapEntry color="#810f7c" quantity="11" label="Marsh | Likely" /><ColorMapEntry color="#8856a7" quantity="7" label="Marsh | About as likely as not" /><ColorMapEntry color="#8c96c6" quantity="19" label="Marsh | Unlikely"/><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#252525" quantity="16" label="Cliff | Likely" /><ColorMapEntry color="#636363" quantity="15" label="Cliff | About as likely as not"/><ColorMapEntry color="#969696" quantity="14" label="Cliff | Unlikely" /><ColorMapEntry color="#006d2c" quantity="4" label="Forest | Likely" /><ColorMapEntry color="#2ca25f" quantity="6" label="Forest | About as likely as not"/><ColorMapEntry color="#66c2a4" quantity="18" label="Forest | Unlikely"/><ColorMapEntry color="#FF0000" quantity="2" label="Developed | Likely" /><ColorMapEntry color="#FF9999" quantity="3" label="Developed | About as likely as not"/><ColorMapEntry color="#FFCCCC" quantity="17" label="Developed | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
        },{singleTile: false,ratio: 1,isBaseLayer: false,transitionEffect: 'resize',visibility: true,});
    
    crd30 = new OpenLayers.Layer.WMS("cite:crd30_prj", WMS,{format: 'image/png',transparent: true,
            sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd30_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#045a8d" quantity="1" label="Subaqueous | Likely" /><ColorMapEntry color="#3399FF" quantity="8" label="Subaqueous | About as likely as not" /><ColorMapEntry color="#99CCFF" quantity="9" label="Subaqueous | Unlikely"/><ColorMapEntry color="#810f7c" quantity="11" label="Marsh | Likely" /><ColorMapEntry color="#8856a7" quantity="7" label="Marsh | About as likely as not" /><ColorMapEntry color="#8c96c6" quantity="19" label="Marsh | Unlikely"/><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#252525" quantity="16" label="Cliff | Likely" /><ColorMapEntry color="#636363" quantity="15" label="Cliff | About as likely as not"/><ColorMapEntry color="#969696" quantity="14" label="Cliff | Unlikely" /><ColorMapEntry color="#006d2c" quantity="4" label="Forest | Likely" /><ColorMapEntry color="#2ca25f" quantity="6" label="Forest | About as likely as not"/><ColorMapEntry color="#66c2a4" quantity="18" label="Forest | Unlikely"/><ColorMapEntry color="#FF0000" quantity="2" label="Developed | Likely" /><ColorMapEntry color="#FF9999" quantity="3" label="Developed | About as likely as not"/><ColorMapEntry color="#FFCCCC" quantity="17" label="Developed | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
        },lOptions);
    
    crd50 = new OpenLayers.Layer.WMS("cite:crd50_prj", WMS,{format: 'image/png',transparent: true,
            sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld  http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd50_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#045a8d" quantity="1" label="Subaqueous | Likely" /><ColorMapEntry color="#3399FF" quantity="8" label="Subaqueous | About as likely as not" /><ColorMapEntry color="#99CCFF" quantity="9" label="Subaqueous | Unlikely"/><ColorMapEntry color="#810f7c" quantity="11" label="Marsh | Likely" /><ColorMapEntry color="#8856a7" quantity="7" label="Marsh | About as likely as not" /><ColorMapEntry color="#8c96c6" quantity="19" label="Marsh | Unlikely"/><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#252525" quantity="16" label="Cliff | Likely" /><ColorMapEntry color="#636363" quantity="15" label="Cliff | About as likely as not"/><ColorMapEntry color="#969696" quantity="14" label="Cliff | Unlikely" /><ColorMapEntry color="#006d2c" quantity="4" label="Forest | Likely" /><ColorMapEntry color="#2ca25f" quantity="6" label="Forest | About as likely as not"/><ColorMapEntry color="#66c2a4" quantity="18" label="Forest | Unlikely"/><ColorMapEntry color="#FF0000" quantity="2" label="Developed | Likely" /><ColorMapEntry color="#FF9999" quantity="3" label="Developed | About as likely as not"/><ColorMapEntry color="#FFCCCC" quantity="17" label="Developed | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
        },lOptions);
    
    crd80 = new OpenLayers.Layer.WMS("cite:crd80_prj", WMS,{format: 'image/png',transparent: true,
            sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld  http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd80_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#045a8d" quantity="1" label="Subaqueous | Likely" /><ColorMapEntry color="#3399FF" quantity="8" label="Subaqueous | About as likely as not" /><ColorMapEntry color="#99CCFF" quantity="9" label="Subaqueous | Unlikely"/><ColorMapEntry color="#810f7c" quantity="11" label="Marsh | Likely" /><ColorMapEntry color="#8856a7" quantity="7" label="Marsh | About as likely as not" /><ColorMapEntry color="#8c96c6" quantity="19" label="Marsh | Unlikely"/><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#252525" quantity="16" label="Cliff | Likely" /><ColorMapEntry color="#636363" quantity="15" label="Cliff | About as likely as not"/><ColorMapEntry color="#969696" quantity="14" label="Cliff | Unlikely" /><ColorMapEntry color="#006d2c" quantity="4" label="Forest | Likely" /><ColorMapEntry color="#2ca25f" quantity="6" label="Forest | About as likely as not"/><ColorMapEntry color="#66c2a4" quantity="18" label="Forest | Unlikely"/><ColorMapEntry color="#FF0000" quantity="2" label="Developed | Likely" /><ColorMapEntry color="#FF9999" quantity="3" label="Developed | About as likely as not"/><ColorMapEntry color="#FFCCCC" quantity="17" label="Developed | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
        },lOptions);
    
    ae20 = new OpenLayers.Layer.WMS("cite:AE20_prj", WMS,{layers: 'cite:AE20_prj',format: 'image/png',transparent: true,},lOptions);
    ae30 = new OpenLayers.Layer.WMS("cite:AE30_prj", WMS,{layers: 'cite:AE30_prj',format: 'image/png',transparent: true,},lOptions);
    ae50 = new OpenLayers.Layer.WMS("cite:AE50_prj", WMS,{layers: 'cite:AE50_prj',format: 'image/png',transparent: true,},lOptions);
    ae80 = new OpenLayers.Layer.WMS("cite:AE80_prj", WMS,{layers: 'cite:AE80_prj',format: 'image/png',transparent: true,},lOptions);
    pae20 = new OpenLayers.Layer.WMS("cite:PAE20_prj", WMS,{layers: 'cite:pae20_prj',format: 'image/png',transparent: true,},lOptions);
    pae30 = new OpenLayers.Layer.WMS("cite:PAE30_prj", WMS,{layers: 'cite:pae30_prj',format: 'image/png',transparent: true,},lOptions);
    pae50 = new OpenLayers.Layer.WMS("cite:PAE50_prj", WMS,{layers: 'cite:pae50_prj',format: 'image/png',transparent: true,},lOptions);
    pae80 = new OpenLayers.Layer.WMS("cite:PAE80_prj", WMS,{layers: 'cite:pae80_prj',format: 'image/png',transparent: true,},lOptions );
    cr20 = new OpenLayers.Layer.WMS("cite:cr20_prj", WMS,{layers: 'cite:cr20_prj',format: 'image/png',transparent: true,},lOptions );
    cr30 = new OpenLayers.Layer.WMS("cite:cr30_prj", WMS,{layers: 'cite:cr30_prj',format: 'image/png',transparent: true,},lOptions);
    cr50 = new OpenLayers.Layer.WMS("cite:cr50_prj", WMS,{layers: 'cite:cr50_prj',format: 'image/png',transparent: true,},lOptions);
    cr80 = new OpenLayers.Layer.WMS("cite:cr80_prj", WMS,{layers: 'cite:cr80_prj',format: 'image/png',transparent: true,},lOptions);
    
    map.addLayers([baseAerial,crd20,crd30,crd50,crd80,ae20,ae30,ae50,ae80,pae20,pae30,pae50,pae80,cr20,cr30,cr50,cr80]);  //Add layers to map
 
    // Add controls
    map.addControl(new OpenLayers.Control.Navigation());
    map.addControl(new OpenLayers.Control.NavToolbar({position: new OpenLayers.Pixel(5, 60)})); 
    map.addControl(new OpenLayers.Control.Zoom());
    map.addControl(new OpenLayers.Control.ScaleLine());
    map.setCenter(map.getProjectionObject(), 7);       

} // End init()

/* Alternate Controls
 * 
map.addControl(new OpenLayers.Control.PanZoomBar({
    position: new OpenLayers.Pixel(2, 5)
}));
map.addControl(new OpenLayers.Control.Scale($('scale')));
map.addControl(new OpenLayers.Control.MousePosition({element: $('location')}));
map.addControl(new OpenLayers.Control.LayerSwitcher({
    position: new OpenLayers.Pixel(2,320),
    ascending: false,
}));
map.zoomToExtent(bounds);
 map.addControl(new OpenLayers.Control.Geolocate());
 */

/* Alternate initial SLDs
 * 
sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd20_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd30_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld  http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd50_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
sld_body: '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld  http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"><NamedLayer><Name>crd80_prj</Name><UserStyle><FeatureTypeStyle><Rule><RasterSymbolizer><Opacity>1.0</Opacity><ColorMap type="values"><ColorMapEntry color="#CC9900" quantity="10" label="Beach | Very likely" /><ColorMapEntry color="#FF9900" quantity="5" label="Beach | Likely" /><ColorMapEntry color="#FFCC66" quantity="12" label="Beach  | About as likely as not"/><ColorMapEntry color="#FFFFCC" quantity="13" label="Beach | Unlikely" /><ColorMapEntry color="#000000" quantity="0" label="nodata" opacity="0.0"/></ColorMap></RasterSymbolizer></Rule></FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
*/