/* ######################################################### */
/* ######## Ogólnie to bałagan w kodzie straszny ########### */
/* ######## ale na drugi termin projektu wszystko ########## */
/* ########## jakoś uporządkuje. Teraz nie chcę ############ */
/* ########### psuć sobie kolejności kodu, bo się ########## */
/* #### pogubię w nim jeszcze bardziej niż kiedykolwiek #### */
/* ######################################################### */
/* ############## 3ib ##Dominik Pająk ## 3ib ############### */
/* ######################################################### */

var game = [];

function disabledShadow() {
	if(start % mapa.wiersze == 1 || start % mapa.wiersze == 0) {
		document.getElementById("tdshadow" + start).className = "game_area_shadownear1";
		document.getElementById("tdshadow" + (start-mapa.wiersze)).className = "game_area_shadownear2";
		document.getElementById("tdshadow" + (start+mapa.wiersze)).className = "game_area_shadownear2";
	} else {
		document.getElementById("tdshadow" + start).className = "game_area_shadownear1";
		document.getElementById("tdshadow" + (start-1)).className = "game_area_shadownear2";
		document.getElementById("tdshadow" + (start+1)).className = "game_area_shadownear2";
		document.getElementById("tdshadow" + (start-mapa.wiersze)).className = "game_area_shadownear2";
		document.getElementById("tdshadow" + (start+mapa.wiersze)).className = "game_area_shadownear2";
	}
}

var gra = {
	minimapa: function() {
		var i = 1;
		var o = 1;
		var table = document.getElementById('minimap'); 

		var tableHTML = ""; 
		for( var y = 1; y <= mapa.wiersze; y++ ) {
			var tr = "<tr>";
			
			for( var x = 1; x <= mapa.wiersze; x++) {
				if(area_number[i] == 0) {
					game[o] = 0;
					var td = "<td id='gamepoint"+o+"' class='game_area_free'></td>"; 
				} else if(area_number[i] == 1) {
					game[o] = 1;
					var td = "<td id='gamepoint"+o+"' class='game_area_wall'></td>";
				} else if(area_number[i] == 3) {
					game[o] = 3;
					var td = "<td id='gamepoint"+o+"' class='game_area_start'></td>";
					start = i;
				} else if(area_number[i] == 4) {
					game[o] = 4;
					var td = "<td id='gamepoint"+o+"' class='game_area_end'></td>";
				}
				tr += td; 
				i++;
				o++;
			};
			tr += "</tr>"; 

			tableHTML += tr; 
		};
		table.innerHTML = tableHTML;
	},	
	
	minimapaShadow: function() {
		var i = 1;
		var o = 1;
		var table = document.getElementById('minimap_shadow'); 

		var tableHTML = ""; 
		for( var y = 1; y <= mapa.wiersze; y++ ) {
			var tr = "<tr>";
			
			for( var x = 1; x <= mapa.wiersze; x++) {
					var td = "<td id='tdshadow"+o+"' class='td_shadow'></td>";
				tr += td; 
				i++;
				o++;
			};
			tr += "</tr>"; 

			tableHTML += tr; 
		};
		table.innerHTML = tableHTML;	
		disabledShadow()		
	},	
}

var kierunek = "N";
var back = 0;

window.addEventListener('keydown', function(event) {
switch (event.keyCode) {
    case 37: // Left
		if( kierunek == "N" ) {
			kierunek = "W";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_left";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(mapa.wiersze);
		} else if( kierunek == "E" ) {
			kierunek = "N";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_top";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(1);
		} else if( kierunek == "S" ) {
			kierunek = "E";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_right";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(mapa.wiersze);
		} else if( kierunek == "W" ) {
			kierunek = "S";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_bottom";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(1);
		}
    break;
 
    case 38: // Up
		if( kierunek == "N" ) {
			move_up();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} else if( kierunek == "E" ) {
			move_right();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} else if( kierunek == "S" ) {
			move_down();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} else if( kierunek == "W" ) {
			move_left();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		}
    break;
 
    case 39: // Right
		if( kierunek == "N" ) {
			kierunek = "E";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_right";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(mapa.wiersze);
		} else if( kierunek == "E" ) {
			kierunek = "S";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_bottom";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(1);
		} else if( kierunek == "S" ) {
			kierunek = "W";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_left";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(mapa.wiersze);
		} else if( kierunek == "W" ) {
			kierunek = "N";
			document.getElementById("gamepoint" + start).className = "game_area_start_a_top";
			document.getElementById("konsola").innerHTML += " >>  Cardinal point: "+kierunek+"<br />";
			jaskinia(1);
		}
    break;
 
    case 40: // Down
		if( kierunek == "N" ) {
			back = 1;
			move_down();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} else if( kierunek == "E" ) {
			back = 1;
			move_left();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} else if( kierunek == "S" ) {
			back = 1;
			move_up();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} else if( kierunek == "W" ) {
			back = 1;
			move_right();
			document.getElementById("konsola").innerHTML += " >> Position: "+start+" " +kierunek+"<br />";
		} 
    break;
	
	case 13: // Down
		//alert("enter");
		backmenu() ;
    break;
  }
}, false);

function jaskinia( pozycjaS ) {
	//alert("działa1");
		
		if(game[(start - pozycjaS)] == 1 && game[(start + pozycjaS)] == 1) {
			document.getElementById("ekran_gry").innerHTML = '<img src="img/wall_wall.png" class="imggme"/>' ;
			test(pozycjaS);
		} else if(game[(start - pozycjaS)] == 0 && game[(start + pozycjaS)] == 1 && kierunek == "N" || game[(start - pozycjaS)] == 1 && game[(start + pozycjaS)] == 0 && kierunek == "S" || game[(start - pozycjaS)] == 0 && game[(start + pozycjaS)] == 1 && kierunek == "E" || game[(start - pozycjaS)] == 1 && game[(start + pozycjaS)] == 0 && kierunek == "W") {
			document.getElementById("ekran_gry").innerHTML = '<img src="img/door_wall.png" class="imggme"/>' ;
			test(pozycjaS);
		} else if(game[(start - pozycjaS)] == 1 && game[(start + pozycjaS)] == 0 && kierunek == "N" || game[(start - pozycjaS)] == 0 && game[(start + pozycjaS)] == 1 && kierunek == "S" || game[(start - pozycjaS)] == 1 && game[(start + pozycjaS)] == 0 && kierunek == "E" || game[(start - pozycjaS)] == 0 && game[(start + pozycjaS)] == 1 && kierunek == "W") {
			document.getElementById("ekran_gry").innerHTML = '<img src="img/wall_door.png" class="imggme"/>' ;
			test(pozycjaS);
		} else if(game[(start - pozycjaS)] == 0 && game[(start + pozycjaS)] == 0) {
			document.getElementById("ekran_gry").innerHTML = '<img src="img/door_door.png" class="imggme"/>' ;
			test(pozycjaS);
		}
}

function test(pozycjaS) {
	if( pozycjaS == 1) {
		if( game[(start - mapa.wiersze)] == 1 && kierunek == "N" || game[(start + mapa.wiersze)] == 1 && kierunek == "S" ) {
			document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall.png" class="imggme2"/>' ;
		} else {
			if(game[(start - mapa.wiersze + 1)] == 1 && game[(start - mapa.wiersze - 1)] == 1&& kierunek == "N" || game[(start + mapa.wiersze + 1)] == 1 && game[(start + mapa.wiersze - 1)] == 1&& kierunek == "S") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall_wall.png" class="imggme2"/>' ;
			} else if(game[(start - mapa.wiersze + 1)] == 1 && game[(start - mapa.wiersze - 1)] == 0 && kierunek == "N" || game[(start + mapa.wiersze + 1)] == 0 && game[(start + mapa.wiersze - 1)] == 1 && kierunek == "S") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/door_wall.png" class="imggme2"/>' ;
			} else if(game[(start - mapa.wiersze + 1)] == 0 && game[(start - mapa.wiersze - 1)] == 1 && kierunek == "N" || game[(start + mapa.wiersze + 1)] == 1 && game[(start + mapa.wiersze - 1)] == 0 && kierunek == "S") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall_door.png" class="imggme2"/>' ;
			} else if(game[(start - mapa.wiersze + 1)] == 0 && game[(start - mapa.wiersze - 0)] && kierunek == "N" || game[(start + mapa.wiersze + 1)] == 0 && game[(start + mapa.wiersze - 0)] && kierunek == "S") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/door_door.png" class="imggme2"/>' ;
			} 
		}
	} else if(pozycjaS == mapa.wiersze) {
		if( game[(start + 1)] == 1 && kierunek == "E" || game[(start - 1)] == 1 && kierunek == "W" ) {
			document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall.png" class="imggme2"/>' ;
		} else {
			if( game[(start + 1 - mapa.wiersze)] == 1 && game[(start + 1 + mapa.wiersze)] == 1 && kierunek == "E" || game[(start - 1 - mapa.wiersze)] == 1 && game[(start - 1 + mapa.wiersze)] == 1 && kierunek == "W") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall_wall.png" class="imggme2"/>' ;
				//alert("aktualizuje");
			} else if( game[(start + 1 - mapa.wiersze)] == 1 && game[(start + 1 -mapa.wiersze)] == 0 && kierunek == "E" || game[(start - 1 - mapa.wiersze)] == 0 && game[(start - 1 + mapa.wiersze)] == 1 && kierunek == "W") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall_door.png" class="imggme2"/>' ;
				//alert("aktualizuje");
			} else if( game[(start + 1 - mapa.wiersze)] == 0 && game[(start + 1 + mapa.wiersze)] == 1 && kierunek == "E" || game[(start - 1 - mapa.wiersze)] == 1 && game[(start - 1 + mapa.wiersze)] == 0 && kierunek == "W") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/door_wall.png" class="imggme2"/>' ;
				//alert("aktualizuje");
			} else if( game[(start + 1 - mapa.wiersze)] == 0 && game[(start + 1 + mapa.wiersze)] == 0 && kierunek == "E" || game[(start - 1 - mapa.wiersze)] == 0 && game[(start - 1 + mapa.wiersze)] == 0 && kierunek == "W") {
				document.getElementById("ekran_gry2").innerHTML = '<img src="img/door_door.png" class="imggme2"/>' ;
				//alert("aktualizuje");
			} 
		}
	}
}

function move_left() {
	if( start % mapa.wiersze == 1) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else if( start == 1) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
		alert("xd left");
		document.getElementById("ekran_gry2").innerHTML = '<img src="img/wall.png" class="imggme2"/>' ;
	} else if( game[start-1] == 1) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else {
		document.getElementById("gamepoint" + start).className = "game_area_free";
		start -= 1;
		if( back == 1 ) {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_right";
			back = 0;
		} else {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_left";
		}
		disabledShadow();
		
		//document.getElementById("all_minimapa").style.transform="rotate(90deg)"
		
		if( game[start] == 4) {
			alert("Wygrałeś");
		}
	}
	if( kierunek == "W" || kierunek == "E") {
		jaskinia(mapa.wiersze);

	} else if( kierunek == "N" || kierunek == "S") {
		jaskinia(1);
	}
		
		if( game[start] == 4) {
			alert("Wygrałeś");
		}
}

function move_up() {
	if( game[(start - mapa.wiersze)] == 1 ) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else if(start - mapa.wiersze < 1) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
		alert("xd up");
	} else {
		document.getElementById("gamepoint" + start).className = "game_area_free";
		start -= mapa.wiersze;
		if( back == 1 ) {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_bottom";
			back = 0;
		} else {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_top";
		}
		disabledShadow();
		if( kierunek == "W" || kierunek == "E") {
			jaskinia(mapa.wiersze);
		} else if( kierunek == "N" || kierunek == "S") {
			jaskinia(1);
		}
		
		if( game[start] == 4) {
			alert("Wygrałeś");
		}
	}
}

function move_right() {
	if (game[(start + 1)] == 1) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else if( start % mapa.wiersze == 0 ) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else {
		document.getElementById("gamepoint" + start).className = "game_area_free";
		start += 1;
		if( back == 1 ) {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_left";
			back = 0;
		} else {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_right";
		}
		disabledShadow();
		if( kierunek == "W" || kierunek == "E") {
			jaskinia(mapa.wiersze);
		} else if( kierunek == "N" || kierunek == "S") {
			jaskinia(1);
		}
			
		if( game[start] == 4) {
			alert("Wygrałeś");
		}
	}
}

function move_down() {
	if( game[(start + mapa.wiersze)] == 1 ) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else if((start + mapa.wiersze) >= (mapa.wiersze * mapa.wiersze)) {
		document.getElementById("konsola").innerHTML += " > Notice: Wall<br />";
	} else {
		document.getElementById("gamepoint" + start).className = "game_area_free";
		start += mapa.wiersze;
		if( back == 1 ) {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_top";
			back = 0;
		} else {
			document.getElementById("gamepoint" + start).className = "game_area_start_a_bottom";
		}
		disabledShadow();
		if( kierunek == "W" || kierunek == "E") {
			jaskinia(mapa.wiersze);
		} else if( kierunek == "N" || kierunek == "S") {
			jaskinia(1);
		}
			
		if( game[start] == 4) {
			alert("Wygrałeś");
		}
	}
}

function gotoBottom(){
   var element = document.getElementById('konsola');
   element.scrollTop = element.scrollHeight - element.clientHeight;
   element.scrollIntoView(false);
}

setInterval(gotoBottom, 10);
