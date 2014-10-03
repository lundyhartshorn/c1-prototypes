$(document).foundation();

$(document).ready(function(){
	function sticky(){
		if($(window).width() > 620 ){
			if( $(window).scrollTop() > 0){
				$('.collapsed').show();
				$('.full').hide();
				$('footer').css('margin-bottom', 320);
			} else {
				$('.collapsed').hide();
				$('.full').show();
				$('footer').css('margin-bottom', 0);
			}
		}
	}
	var stickyHead = _.debounce(sticky, 50);
	$(window).scroll(stickyHead);

	$('.alreadyApp').on('click', function(e){
		var fieldVals = 0;
		$('.infoForm').find('input').each(function(){
			var thisVal = $(this).val();
			if(thisVal != '' && thisVal != undefined){
				fieldVals++;
			}
		});
		if(fieldVals > 0){
			e.preventDefault();
			$('#leaveModal').foundation('reveal', 'open');
		}
	});
	$('#leaveModal .left').on('click', function(){
		$('#leaveModal').foundation('reveal', 'close');
	});
	$('#leaveModal .right').on('click', function(){
		window.location.href = $('.alreadyApp').attr('href');
	});

	$('.header').on('click', function(){
		$('.header:visible').removeClass('open');
		$(this).addClass('open');
	});

	function resizeFunctions(){
		if($(window).width() <= 620 ){
			$('.collapsed').find('ul').hide();
			$('.collapsed').unbind().on('click', function(){
				$(this).find('ul').slideToggle();
			});
		} else {
			$('.collapsed').find('ul').show();
		}
	}
	resizeFunctions();
	var resize = _.debounce(resizeFunctions, 500);
	$(window).resize(resize);

	$('.errormsg').on('click', 'a', function(e){
		e.preventDefault();
		var thisText = $(this).text();
		$('input[name="' + thisText + '"').focus();
	});

	$("#zip").blur(function(){
		var zip = $(this).val();
		$.ajax({url: 'http://ziptasticapi.com/' + zip, type: 'GET'})
			.done(function(response){
			var obj = jQuery.parseJSON(response);
			
			_.mixin({
				capitalize: function(string) {
					return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
				}
			});
			var city = _(obj.city).capitalize();

			$('input[name="City"]').val(city).trigger('input');
			$('select[name="State"]').val(obj.state).trigger('change');
		});
	});

});

var validationInfo = angular.module('validationInfo', []);

validationInfo.controller('mainController', function($scope) {

	// function to submit the form after all validation has occurred			
	$scope.submitForm = function(isValid) {

		$scope.submitted = true;

		// check to make sure the form is completely valid
		if (isValid) {
			console.log('valid')
			window.location.href = "/success.html";
		}

	};

	$scope.getErrorCount = function(){
		var error = $scope.infoForm.$error.required;
	    var count = 0;
	    angular.forEach(error, function(field){
            
            count++;

	    });

	    return count;
	}

	$scope.getErrors = function(isValid){

		if (!isValid){

			var error = $scope.infoForm.$error.required;

		    return error;

		}

    }



});