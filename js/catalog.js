(function() {
	var	products = document.querySelector('#products'),
		wrapper = document.querySelector('.wrapper'),
		userData,
		xhr = new XMLHttpRequest();

	xhr.open('GET', '/src/catalog.json', false);
	xhr.onreadystatechange = function() { 
		if (this.readyState === 4 && this.status == 200) {
			userData = JSON.parse(this.responseText); 

			var output = '';

			for (let i = 0; i < userData.length; i++) {
					
					output += '<div class="container">' + '<img src="' + userData[i]['thumbnail'] + '"' + 'alt="' + userData[i]['id'] + '" />'
					output += '<span class="title">' + userData[i]['title'] + '</span>';
					output += '<div class="cost">' + '<span class="oldprice">' + userData[i]["oldprice"] + '</span>';
					output += '<span class="price">' + userData[i]["price"] + '</span>' + '</div>'+ '</div>';
						
				}

				wrapper.innerHTML = output;

			}

		};
	xhr.send();

	const popUpInit = function() {
		console.log('popup init');

		var popUpElem = document.createElement('div'),
			popUpOverlayElem = document.createElement('div'),
			popUpContainerElem = document.createElement('div');

			var closeButton = document.querySelector('.close');	


		popUpElem.setAttribute('id', 'popup');
		popUpElem.classList.add('popup');

		popUpOverlayElem.classList.add('popup__overlay');
		popUpOverlayElem.setAttribute('onclick', 'ClearPopUp()');

		popUpContainerElem.classList.add('popup__container');
	
		popUpElem.appendChild(popUpOverlayElem);
		popUpElem.appendChild(popUpContainerElem);
		document.body.appendChild(popUpElem);

		if (document.querySelector('#popup > .popup__container') === null || document.querySelector('#popup > .popup__overlay') === null) return false;

		var addEvents = function() {
				var cont = document.body.querySelectorAll('.container');
				console.log(cont.length);
				if (cont.length > 0) {
					for(let i = 0; i <= cont.length-1; i++) {
						cont[i].addEventListener('click', function(ev) {
							ev.preventDefault();
							ev.stopPropagation();

							target = ev.target;
							for (j=0; j<userData.length; j++){
								var alt = target.parentNode.firstChild.getAttribute('alt');
								if (alt == userData[j]['id']) return getPopUpContent(userData[j]);
							}
						});
					}
				}

				ClearPopUp = function() {
					if (popUpElem.style.display = 'block') {
						popUpElem.style.display = 'none';
						popUpContainerElem.innerHTML = '';
					}
				}
			},

			getPopUpContent = function(element) {
				var contentElem = '';
				var mainSide = document.createElement('div'),
					contentSide = document.createElement('div');
					imageBox = document.createElement('div'),
					priceBox = document.createElement('div'),
					oldprice = document.createElement('span'),
					price = document.createElement('span'),
					description = document.createElement('h3'),
					company = document.createElement('p'),
					content = document.createElement('div');
					close = document.createElement('div');

					description.innerHTML = element['description'];
					company.innerHTML = 'Company: ' + element['company'];
					content.innerHTML = element['content'];
					oldprice.innerHTML = element['oldprice'];
					price.innerHTML = element['price'];

					close.innerHTML = 'X';

					description.classList.add('description');
					company.classList.add('company');
					content.classList.add('content');
					mainSide.classList.add('mainSide');
					contentSide.classList.add('contentSide');
					oldprice.classList.add('oldprice');
					price.classList.add('price');

					close.classList.add('close');
					close.setAttribute('onclick', 'ClearPopUp()');

					img = document.createElement('img');
					imageBox.classList.add('imageBox');
					priceBox.classList.add('priceBox');
					img.setAttribute('src', element['fullimage']);
					img.setAttribute('alt', element['id']);

					imageBox.appendChild(img);
					priceBox.appendChild(oldprice);
					priceBox.appendChild(price);

					mainSide.appendChild(imageBox);
					mainSide.appendChild(priceBox);

					contentSide.appendChild(description);
					contentSide.appendChild(company);
					contentSide.appendChild(content);
					
					contentElem += imageBox;


				 
					popUpContainerElem.appendChild(close);
					popUpContainerElem.appendChild(mainSide);
					popUpContainerElem.appendChild(contentSide);

					
					
				

				if (popUpContainerElem.querySelectorAll('*').length > 0) showPopUp();

				return true;
			},


			

			showPopUp = function() {
				popUpElem.style.display = 'flex';

				/*popUpContainerElem.style.marginLeft = '-' + (popUpContainerElem.offsetWidth/2) + 'px';
				popUpContainerElem.style.marginTop = '-' + (popUpContainerElem.offsetHeight/2) + 'px';*/
			};

		addEvents();
	};

	this.popup = function() {
		return popUpInit();
	};
	
		
	

})();

popup();


