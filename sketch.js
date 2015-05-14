$(function() {
	var dimension = 16;								
	var boxSize; 
	var container$ = $('#container');				
	var checkbox$ = $('input[name=borders]');		
	var boxes$;										
	var apiStr = 'src="http://1.bp.blogspot.com/-uASX6b1pmkE/Uwo3B9tbUgI/AAAAAAAABYg/AFg5lajcDvE/s1600/Bang+Dirt.gif"';	


	
	var borderCheck = function() {
		if ( checkbox$.is(':checked') ) {
			boxes$.css('border', '1px solid #ABB7B7');
		} else {
			
			$("div.box").css('border', 'none');
		}
	};


	checkbox$.change( borderCheck );		

	$(":button").click(function() {
		var whichButton = parseInt($(this).attr("value"),10);		
		dimension = prompt('How many boxes? 128 Boxes is the max');

		if ( isNaN(dimension)  || dimension < 1 || dimension > 128 ) {
			dimension = ((whichButton === 5) ? 3 : 16);		// default for images is 3x3 instead of 16x16
		}
		new_grid(dimension);
		handle(whichButton);
	});


	
	var handle = function(which) {
		function get_random_color() {	
			return '#'+Math.floor(Math.random()*16777215).toString(16);
		}

		container$.on("mouseenter", "div", function() {
			switch(which) {
				case 1:									// Button 1 : color change
					$(this).addClass('simpleColor');
					break;
				case 2:									// Button 2: a random color
					$(this).css("background-color", get_random_color());
					break;
				case 3:									// Button 3: lighten box more & more each time you pass over it
					var op = $(this).css("opacity");
					$(this).css("opacity", ( op > 0.5 ) ? ( op - 0.3 ) : op );
					break;
				case 4:									// Button 4: leave a trail!
					$(this).fadeTo(0,0);					// fadeTo(duration, opacity)
					// $(this).mouseleave(function(){	$(this).fadeTo(600,1);	});
					break;
				case 5:									// Button 5: spike gif
					if ( $(this).html() === "" ) {		
						$(this).append('<img width="' + boxSize + '" height="' + boxSize + '" ' + apiStr + ' >');
						$(this).addClass('rotate15');
					} else {	// apply class for img rotation when mouse over image
						if (! $(this).hasClass('rotate15')) {
							$(this).addClass('rotate15');
						}
					}
					break;
			}
		});

		container$.on("mouseleave", "div", which, function() {
			switch(which) {
				case 4:
					$(this).fadeTo(600,1);
					break;
				case 5:
					$(this).removeClass('rotate15');
					break;
				default:
					break;
			}
		});
	};


	// Draw a new grid that is of dimension size * size.  
	var new_grid = function(size) {
		var divsToInsert = [];
		boxSize = Math.floor( 960 / size );

		container$.off();
		container$.html('');		// Empty out container. 

		container$.css('width', boxSize * size);	
		for ( var i = 0 ; i < size * size; i += 1) {
			divsToInsert[i] = "<div class='box' style='width:" + boxSize + "px; height:" + boxSize+"px;'></div>";
			
		}

		container$.append(divsToInsert.join(''));    
		boxes$ = $("div.box");
		borderCheck();
	};


	$('#loading_Msg').css('display', 'none');		// get rid of loading message.
	new_grid(dimension);
	handle(1);
});
