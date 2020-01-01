/* ######################################################### */
/* ######## Ogólnie to bałagan w kodzie straszny ########### */
/* ######## ale na drugi termin projektu wszystko ########## */
/* ########## jakoś uporządkuje. Teraz nie chcę ############ */
/* ########### psuć sobie kolejności kodu, bo się ########## */
/* #### pogubię w nim jeszcze bardziej niż kiedykolwiek #### */
/* ######################################################### */
/* ############## 3ib ##Dominik Pająk ## 3ib ############### */
/* ######################################################### */

var area_number = [];
var onWall = 1;
var offWall = 0;
var temp;
var warunek1 = 0;
var warunek2 = 0;
var warunekilosc1 = 1;
var warunekilosc2 = 1;
var start;
var end;
var warning1 = 0;

var mapa = {
	kolumny: 10,
	wiersze: 10,
	cellID: "map_cell",
	
	
	CreateMap: function() {
		document.getElementById("button_start").className = "disactive";
		
		onWall = 1;
		offWall = 0;
		
		area_number = [];
		warunek1 = 0;
		warunek2 = 0;
		warunekilosc1 = 1;
		warunekilosc2 = 1;

		var i = 1;
		var table = document.getElementById('map'); 

		if( this.kolumny != this.wiersze ) {
			alert("Przy podaniu niestandardowych wartości, w grze występuą błędy! Pracujemy nad poprawą tej usterki! Zachęcamy do gry na kwadratowej mapie!");
		}
		
		var tableHTML = ""; 
		for( var y = 1; y <= this.wiersze; y++ ) {
			var tr = "<tr>";
			
			for( var x = 1; x <= this.kolumny; x++) {
				if( i <= mapa.kolumny ||  i % mapa.kolumny == 0 || i % mapa.kolumny == 1 || i >= mapa.wiersze * mapa.kolumny - mapa.kolumny) {
					area_number[i] = onWall;
					
					var td = "<td id='map_cell" + i + "' class='mapGenerator'><button class='class_deleteWall' style='cursor: default;'></button></td>"; 
					tr += td; 
					i++;
				} else {
					area_number[i] = offWall;
					
					var td = "<td id='map_cell" + i + "' class='mapGenerator'><button class='class_addWall' onClick='wall.addWall(" + i + ")'></button></td>"; 
					tr += td; 
					i++;
				}
			};
			tr += "</tr>"; 

			tableHTML += tr; 
		};
		table.innerHTML = tableHTML;


	},
	
	CreateMapFirst: function() {
		mapa.CreateMap();
	},
};

var wall = {
	deleteWall: function( o ) {
		if(area_number[o] == 3) {
			if(temp == 0) {
				this.addWall( o );
				
			} else if (temp == 1) {
				area_number[o] = 1;
				warunekilosc1 = 1;
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + o + ")'></button>";
			}
		} else if( area_number[o] == 4 ) {
			if(temp2 == 0) {
				this.addWall( o );
				
			} else if (temp2 == 1) {
				area_number[o] = 1;
				warunekilosc2 = 1;
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + o + ")'></button>";
			}
		} else if( area_number[o] == 1 ) {
			if(warunek1 == 1) {
				if( warunekilosc1 == 1) {
					temp = area_number[o];
					area_number[o] = 3;
					document.getElementById("map_cell" + o).innerHTML = "<button class='class_startWall' onClick='wall.deleteWall(" + o + ")'></button>";
					warunekilosc1 = 0;
					start = o;

				} else if(warunekilosc1 == 0) {
					if(temp == 0) {
						area_number[start] = 0;
						area_number[o] = 1;
						warunekilosc1 = 1;
						document.getElementById("map_cell" + start).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + start + ")'></button>";
						this.deleteWall(o);
					} else if (temp == 1) {
						area_number[start] = 1;
						warunekilosc1 = 1;
						document.getElementById("map_cell" + start).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + start + ")'></button>";
						this.deleteWall(o);
					}
				}
			} else if(warunek2 == 1) {
				if( warunekilosc2 == 1) {
					temp2 = area_number[o];
					area_number[o] = 4;
					document.getElementById("map_cell" + o).innerHTML = "<button class='class_endWall' onClick='wall.deleteWall(" + o + ")'></button>";
					warunekilosc2 = 0;
					end = o;
				} else if(warunekilosc2 == 0) {
					if(temp2 == 0) {
						area_number[end] = 0;
						area_number[o] = 1;
						warunekilosc2 = 1;
						document.getElementById("map_cell" + end).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + end + ")'></button>";
						this.deleteWall(o);
					} else if (temp2 == 1) {
						area_number[end] = 1;
						warunekilosc2 = 1;
						document.getElementById("map_cell" + end).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + end + ")'></button>";
						this.deleteWall(o);
					}
				}
			} else if(warunek1 == 0 && warunek2 == 0) {
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + o + ")'></button>";
				area_number[o] = offWall;
			} 
		} else if( area_number[o] == 0) {
				this.addWall();
		}
	},
	
	addWall: function( o ) {
		if(area_number[o] == 3) {
			if(temp == 1) {
				this.deleteWall( o );
				alert("To nie powinno tak być!!!");
			} else if (temp == 0) {
				area_number[o] = 0;
				warunekilosc1 = 1;
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + o + ")'></button>";
			}
		} else if( area_number[o] == 4 ) {
			if(temp2 == 1) {
				this.deleteWall( o );
				alert("To nie powinno tak być!!!");
			} else if (temp2 == 0) {
				area_number[o] = 0;
				warunekilosc2 = 1;
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + o + ")'></button>";
			}
		} else if( area_number[o] == 0 ) {
			if(warunek1 == 1) {
				if( warunekilosc1 == 1) {
					temp = area_number[o];
					area_number[o] = 3;
					document.getElementById("map_cell" + o).innerHTML = "<button class='class_startWall' onClick='wall.addWall(" + o + ")'></button>";
					warunekilosc1 = 0;
					start = o;
				} else if(warunekilosc1 == 0) {
					if(temp == 1) {
						area_number[start] = 1;
						warunekilosc1 = 1;
						area_number[o] = 0;
						document.getElementById("map_cell" + start).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + start + ")'></button>";
						this.addWall(o);
					} else if (temp == 0) {
						area_number[start] = 0;
						warunekilosc1 = 1;
						document.getElementById("map_cell" + start).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + start + ")'></button>";
						this.addWall(o);
					}
				}
			} else if(warunek2 == 1) {
				if( warunekilosc2 == 1) {
					temp2 = area_number[o];
					area_number[o] = 4;
					document.getElementById("map_cell" + o).innerHTML = "<button class='class_endWall' onClick='wall.addWall(" + o + ")'></button>";
					warunekilosc2 = 0;
					end = o;
				} else if(warunekilosc2 == 0) {
					if(temp2 == 1) {
						area_number[end] = 1;
						warunekilosc2 = 1;
						area_number[o] = 0;
						document.getElementById("map_cell" + end).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + end + ")'></button>";
						this.addWall(o);
					} else if (temp2 == 0) {
						area_number[end] = 0;
						warunekilosc2 = 1;
						document.getElementById("map_cell" + end).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + end + ")'></button>";
						this.addWall(o);
					}
				}
			} else if(warunek1 == 0 && warunek2 == 0) {
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + o + ")'></button>";
				area_number[o] = onWall;
			} 
		} else if( area_number[o] == 1) {
				this.deleteWall();
		}
	},
	
	start: function() {
		if(warunek1 == 0) {
			if(document.getElementById("button_end").className == "active") {
				wall.end();
			}
			warunek1 = 1;
			onWall = 3;
			offWall = 3;
			document.getElementById("button_start").className = "active";
			document.getElementById("class_deleteWall").className = "class_deleteWall2";
			document.getElementById("class_addWall").className = "class_addWall2";
		} else if(warunek1 == 1) {
			warunek1 = 0;
			onWall = 1;
			offWall = 0;
			document.getElementById("button_start").className = "disactive";
			document.getElementById("class_deleteWall").className = "class_deleteWall";
			document.getElementById("class_addWall").className = "class_addWall";
		}
	},
	
	end: function() {
		if(warunek2 == 0) {
			if(document.getElementById("button_start").className == "active") {
				wall.start();
			}
			warunek2 = 1;
			onWall = 4;
			offWall = 4;
			document.getElementById("button_end").className = "active";
		} else if(warunek2 == 1) {
			warunek2 = 0;
			onWall = 1;
			offWall = 0;
			document.getElementById("button_end").className = "disactive";
			document.getElementById("class_adWall").className = "class_addWall";
			document.getElementById("class_deleteWall").className = "class_deleteWall";
		}
	},
};

function licz() {
	document.getElementById("WygenerowanaArea").style.display = "block";
	document.getElementById("Wygenerowana").innerHTML = " ";
	var en = 1;
	for(var z = 1; z < area_number.length; z++) {
		if(en == mapa.kolumny) {
			en = 0;
			document.getElementById("Wygenerowana").innerHTML += area_number[z] + ", <br />";
		} else {
			document.getElementById("Wygenerowana").innerHTML += area_number[z] + ", ";
		}
		en++;
	}
};

function alert( z ) {
	document.getElementById("alert").style.display = "block";
	document.getElementById("alert_info").innerHTML = z + "<br /><button onClick='backmenu()'>Ok</button>";
};

function backmenu() {
	document.getElementById("WygenerowanaArea").style.display = "none";
	document.getElementById("alert").style.display = "none";
}

function MapaGeneruj() {
	if( document.getElementById("SelectMapWidth").value < 6 || document.getElementById("SelectMapWidth").value > 20) {
		alert("NIE MIEŚCISZ SIĘ W SKALI");
	} else {
		mapa.kolumny = document.getElementById("SelectMapWidth").value;
		mapa.wiersze = document.getElementById("SelectMapHeight").value;
	
		mapa.CreateMap();
	}
}

mapa.CreateMapFirst();


function play() {
	alert("<center><img src='img/gif3.gif'  style='width: 40%;'/></center><br />Sterowanie w grze odbywa się za pomocą strzałek!<br /><sub style='font-size: 10px;'>Kliknij 'OK' lub Enter, aby kontynuować!</sub>");
	document.getElementById("game").style.display = 'block';
	gra.minimapa();
	gra.minimapaShadow();
	jaskinia(1);
}

function wczytajMape() {
	for( var o = 1; o < area_number.length; o++) {
		if( o <= mapa.kolumny ||  o % mapa.kolumny == 0 || o % mapa.kolumny == 1 || o >= mapa.wiersze * mapa.kolumny - mapa.kolumny) {
			document.getElementById("map_cell" + o).innerHTML = "<button class='class_deleteWall' style='cursor: default;'></button>";
		} else {
			if(area_number[o] == 0) {
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_addWall' onClick='wall.addWall(" + o + ")'></button>";
			} else if(area_number[o] == 1) {
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_deleteWall' onClick='wall.deleteWall(" + o + ")'></button>";
			} else if(area_number[o] == 3) {
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_startWall' onClick='wall.deleteWall(" + o + ")'></button>";
			} else if(area_number[o] == 4) {
				document.getElementById("map_cell" + o).innerHTML = "<button class='class_endWall' onClick='wall.deleteWall(" + o + ")'></button>";
			}
		}
	};
}

function poziom1() {
	mapa.kolumny = 11;
	mapa.wiersze = 11;
	
	mapa.CreateMap();
	area_number = [666, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
						1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 
						1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 
						1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 
						1, 1, 0, 0, 0, 3, 0, 0, 0, 1, 1, 
						1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 
						1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 
						1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	wczytajMape();
}

function poziom2() {
	mapa.kolumny = 13;
	mapa.wiersze = 13;
	
	mapa.CreateMap();
	area_number = [666, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
						1, 3, 1, 0, 0, 0, 1, 0, 0, 0, 1, 4, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	wczytajMape();
}

function poziom3() {
	mapa.kolumny = 18;
	mapa.wiersze = 18;
	
	mapa.CreateMap();
	area_number = [666, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
						1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 
						1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 
						1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 
						1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 
						1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 
						1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 
						1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 
						1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
						1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 
						1, 0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 
						1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 
						1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 
						1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	wczytajMape();
}

function poziom4() {
	mapa.kolumny = 19;
	mapa.wiersze = 19;
	
	mapa.CreateMap();
	area_number = [666, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 4, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	wczytajMape();
}

function poziom5() {
	mapa.kolumny = 20;
	mapa.wiersze = 20;
	
	mapa.CreateMap();
	area_number = [666, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
						1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 
						1, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 
						1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 
						1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 
						1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
						1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 1, 
						1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 
						1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 
						1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 
						1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 
						1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 
						1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	wczytajMape();
}



