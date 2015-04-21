/*
 * General Scripts
 * Requirements: GeoServer WMS running - "http://localhost:8080/geoserver/cite/wms"
 *               openlayers JS reference file (local or server) - OpenLayers-2.13.1/OpenLayers.js
 * 
 * Author: Sawyer Stippa
 * Company: USGS
 * email: sstippa@usgs.gov
 * 
 */

// Change all layers (except base layer) to hidden
function hideAll() {
     var hide = map.getLayersBy('isBaseLayer',false);
     for (var i=0;i<hide.length;i++) {
          hide[i].setVisibility(false);
     }
}

// Highlight Slider Year
function yearSelect(sl) {
     var year = 'sp' + sl.value;
     document.getElementById(year).style.backgroundColor="#3399FF";
     var yearList = document.getElementsByClassName('years');
     for (var i=0;i<yearList.length;i++) {
          if (yearList[i].id != year) {
               document.getElementById(yearList[i].id).style.backgroundColor='';
          }
     }
}

// Change layer according to slider value
function slider(sl) {hideAll();
     if (document.getElementById('legendWrapper').style.display == 'inline') {
          if (sl.value == '1') {crd20.setVisibility(true);yearSelect(sl);}
          else if (sl.value == '2') {crd30.setVisibility(true);yearSelect(sl);}
          else if (sl.value == '3') {crd50.setVisibility(true);yearSelect(sl);}
          else if (sl.value == '4') {crd80.setVisibility(true);yearSelect(sl);} else {}
     } else if (document.getElementById('mpWrapper').style.display == 'inline') {
          var list = document.getElementsByTagName('input');    
          for (var i = 0;i<list.length;i++) {    
               if (list[i].checked && list[i].value == 'cr' ) {   
                    if (sl.value == '1') {cr20.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '2') {cr30.setVisibility(true);yearSelect(sl)}
                    else if (sl.value == '3') {cr50.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '4') {cr80.setVisibility(true);yearSelect(sl);} else {}
               } else if (list[i].checked && list[i].value == 'ae' ) {
                   if (sl.value == '1') {ae20.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '2') {ae30.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '3') {ae50.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '4') {ae80.setVisibility(true);yearSelect(sl);} else{} 
               }  else if (list[i].checked && list[i].value == 'pae' ) {
                   if (sl.value == '1') {pae20.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '2') {pae30.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '3') {pae50.setVisibility(true);yearSelect(sl);}
                    else if (sl.value == '4') {pae80.setVisibility(true);yearSelect(sl);} else {}
               } else {}
          }    
     } else {}
}

// Loop through decades - change layer visibility and highlighted year
function loop() {hideAll();
     var sl = document.getElementById('slider');
     if (document.getElementById('legendWrapper').style.display == 'inline') {
          sl.value = '1';crd20.setVisibility(true);yearSelect(sl);
          setTimeout(function(){hideAll();sl.value = '2';crd30.setVisibility(true);yearSelect(sl);},1000);
          setTimeout(function(){hideAll();sl.value = '3';crd50.setVisibility(true);yearSelect(sl);},2000);
          setTimeout(function(){hideAll();sl.value = '4';crd80.setVisibility(true);yearSelect(sl);},3000);
     }
     else if (document.getElementById('mpWrapper').style.display == 'inline') {
          var list = document.getElementsByTagName('input');    
          for (var i = 0;i<list.length;i++) {    
               if (list[i].checked && list[i].value == 'cr' ) {   
                    sl.value = '1';cr20.setVisibility(true);yearSelect(sl);
                    setTimeout(function(){hideAll();sl.value = '2';cr30.setVisibility(true);yearSelect(sl);},1000);
                    setTimeout(function(){hideAll();sl.value = '3';cr50.setVisibility(true);yearSelect(sl);},2000);
                    setTimeout(function(){hideAll();sl.value = '4';cr80.setVisibility(true);yearSelect(sl);},3000);
               } else if (list[i].checked && list[i].value == 'ae' ) {    
                    sl.value = '1';ae20.setVisibility(true);yearSelect(sl);
                    setTimeout(function(){hideAll();sl.value = '2';ae30.setVisibility(true);yearSelect(sl);},1000);
                    setTimeout(function(){hideAll();sl.value = '3';ae50.setVisibility(true);yearSelect(sl);},2000);
                    setTimeout(function(){hideAll();sl.value = '4';ae80.setVisibility(true);yearSelect(sl);},3000);
               } else if (list[i].checked && list[i].value == 'pae' ) {  
                    sl.value = '1';pae20.setVisibility(true);yearSelect(sl);
                    setTimeout(function(){hideAll();sl.value = '2';pae30.setVisibility(true);yearSelect(sl);},1000);
                    setTimeout(function(){hideAll();sl.value = '3';pae50.setVisibility(true);yearSelect(sl);},2000);
                    setTimeout(function(){hideAll();sl.value = '4';pae80.setVisibility(true);yearSelect(sl);},3000);
               } else {}
          }
     } else {}
}

var looping = null;
function loopStart() {
    loop()
    looping = setInterval("loop()",4000);
}

function loopStop() {clearInterval(looping);} // Stop decade loop - need to update

function baseSlider(bs) {baseAerial.setOpacity(bs.value);} // Adjust base layer opacity

function getInfo() {
    if (document.getElementById('informationWindow').style.visibility == 'hidden') {
        document.getElementById('informationWindow').style.visibility='visible';
    } else{document.getElementById('informationWindow').style.visibility='hidden';} 
}

function changeSection(dis) {
     var oW = document.getElementById('overviewWrapper');
     var lW = document.getElementById('legendWrapper');
     var mW = document.getElementById('mpWrapper');
     var aW = document.getElementById('addWrapper');
     if (dis.innerHTML == 'Overview') {
          oW.style.display = 'inline';lW.style.display = 'none';mW.style.display = 'none';aW.style.display = 'none';}
     else if (dis.innerHTML == 'Legend') {
          oW.style.display = 'none';lW.style.display = 'inline';mW.style.display = 'none';aW.style.display = 'none';}
     else if (dis.innerHTML == 'Model Predictions') {
          oW.style.display = 'none';lW.style.display = 'none';mW.style.display = 'inline';aW.style.display = 'none';}
     else if (dis.innerHTML == 'Additional Information') {
          oW.style.display = 'none';lW.style.display = 'none';mW.style.display = 'none';aW.style.display = 'inline';}else {}    
}


function modelPredictions(mp) {hideAll();
     var sl = document.getElementById('slider');
// If model predictions section header is clicked
     if (mp.innerHTML == 'Model Predictions') {
          var list = document.getElementsByTagName('input');    
          for (var i = 0;i<list.length;i++) {
               if (list[i].checked && list[i].value == 'cr') {
                    if (sl.value == '1') {cr20.setVisibility(true);}
                    else if (sl.value == '2') {cr30.setVisibility(true);}
                    else if (sl.value == '3') {cr50.setVisibility(true);}
                    else if (sl.value == '4') {cr80.setVisibility(true);} else {} 
               } else if (list[i].checked && list[i].value == 'ae') {
                    if (sl.value == '1') {ae20.setVisibility(true);}
                    else if (sl.value == '2') {ae30.setVisibility(true);}
                    else if (sl.value == '3') {ae50.setVisibility(true);}
                    else if (sl.value == '4') {ae80.setVisibility(true);} else {} 
               } else if (list[i].checked && list[i].value == 'pae') {
                    if (sl.value == '1') {pae20.setVisibility(true);}
                    else if (sl.value == '2') {pae30.setVisibility(true);}
                    else if (sl.value == '3') {pae50.setVisibility(true);}
                    else if (sl.value == '4') {pae80.setVisibility(true);} else {} 
               } else{} 
          }
     } else if (mp.innerHTML == 'Legend') {
          if (sl.value == '1') {crd20.setVisibility(true);}
          else if (sl.value == '2'){crd30.setVisibility(true);}
          else if (sl.value == '3') {crd50.setVisibility(true);}
          else if (sl.value == '4') {crd80.setVisibility(true);} else {}
     } else {}
     
// Change model predictions layer and corresponding legend using radio buttons
     if (mp.value == 'ae') {
          document.getElementById('legendImage').src = "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=cite:AE20_prj";
          if (sl.value == '1') {ae20.setVisibility(true);}
          else if (sl.value == '2') {ae30.setVisibility(true);}
          else if (sl.value == '3') {ae50.setVisibility(true);}
          else if (sl.value == '4') {ae80.setVisibility(true);} else {}
     } else if (mp.value == 'pae') {
          document.getElementById('legendImage').src = "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=cite:pae20_prj";
          if (sl.value == '1') {pae20.setVisibility(true);}
          else if (sl.value == '2') {pae30.setVisibility(true);}
          else if (sl.value == '3') {pae50.setVisibility(true);}
          else if (sl.value == '4') {pae80.setVisibility(true);} else {}
     } else if (mp.value == 'cr'){
          document.getElementById('legendImage').src = "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=cite:cr20_prj";
          if (sl.value == '1') {cr20.setVisibility(true);}
          else if (sl.value == '2') {cr30.setVisibility(true);}
          else if (sl.value == '3') {cr50.setVisibility(true);}
          else if (sl.value == '4') {cr80.setVisibility(true);} else {}  
     } else{}
}

