(function() {

	'use strict';
	var sidePage = document.querySelector('#sd-pg'),
	books=document.querySelector('#books'), 
	mainFill=document.querySelector('#main-fill'), 
	ft=document.querySelector('#ft'),
	spanIco=document.querySelector('#spanIco'),
	iconElements = document.querySelectorAll('.ico-wrap'),
	wrap = document.querySelectorAll('.sm-wrap')[0],

	list=document.querySelector('#list1'),
	listParent=document.querySelector('#list1 > ol'),

	list2=document.querySelector('#list2'),
	listParent2=document.querySelector('#list2 > ol'),

	list3=document.querySelector('#list3'),
	listParent3=document.querySelector('#list3 > ol'),
	playIco = document.querySelector('#play'),
	fw = document.querySelector('#fw'),
	sermonList = document.querySelectorAll('.sermon-list')[0],
	bw = document.querySelector('#bw'),
	int1;
	var pb = document.querySelector('#pb');
	var icoAudio = playIco.querySelector('div');
	var topVal = document.querySelector('#wrapper > p:first-child').getBoundingClientRect().top;
	var audioPath = `${$('.sm-code')[0].innerHTML} ${$('.sm-title')[0].innerHTML}`;
	var hdrCode = $('#date-code')[0],
		hdrTitle = $('#sermon-title')[0];

	function setProp(){

		var winHeight = window.innerHeight, 
		winWidth = window.innerWidth,
		headerElt = document.querySelectorAll('#body header')[0],
		initSize = headerElt.style.fontSize;
		window.onresize = function() {
			assignH()
		}
		assignH()
		function reassignHeight(val) {
			sermonList.style.height = (winHeight - val) + 'px';
		}
		function assignH() {
			reassignHeight(215)

			var winHeight1 = window.innerHeight, 
			winWidth1 = window.innerWidth;

			if (winHeight1 < 380) {
				headerElt.style.height = 'auto';
				headerElt.style.display = 'block';
			} else {
				var addedH = (document.querySelectorAll('.hdr > header')[0].getBoundingClientRect().height 
					+ ft.getBoundingClientRect().height); 

				headerElt.style.height = winHeight1 - Math.round(addedH) - 30 + 'px'
			}
			
			sidePage.style.height = '100vh';
			mainFill.style.height = winHeight1 - 1 + 'px';
		}
		
		
		function fadOf() {
			$('.common-list.currentList').addClass('fadeOut')
			spanIco.classList.add('close');
			setTimeout(function() {
				$('.common-list.currentList').css({'display':'none'})
			},300)
		}
		spanIco.addEventListener('click', function() {
			var olist = document.querySelectorAll('.currentList')[0];
			if (spanIco.classList.contains('close')) {
				spanIco.classList.remove('close');
				olist.classList.add('fadeIn')
				olist.classList.remove('fadeOut')
				setTimeout(()=>{
					olist.style.display = 'block';
				})
			} else {
				spanIco.classList.add('close');
				fadOf()
			}
			
		})
		function createDom(val, parent) {
			for (let i=0; i<val; i+=1) {
				var listItem = document.createElement('li');
				parent.appendChild(listItem)
			}
		}
		function generateYears() {
			var max = 5;
			createDom(max, listParent)
			
			var nodes = listParent.childNodes;
			
			for (let j=0, yrIndex = 1947; j<nodes.length; j+=1) {
				nodes[j].innerHTML = yrIndex
				yrIndex+=1
			}
		}
		generateYears()
		function generateDuration() {
			let dur = ['0:00','0:30','1:00','1:30',
			'2:00','2:30','3:00','3:30','4:00']
			var max = dur.length;

			createDom(max, listParent3)

			var nodes = listParent3.childNodes;

			for (let j=0; j<nodes.length; j+=1) {
				nodes[j].innerHTML = dur[j]
			}
		}
		generateDuration()
		function popDom1() {
			var locDiv = document.querySelector('#parentLoc');
			var matched = document.querySelector('#matched');
			var globeList = document.querySelectorAll('li.sm-list > ul:last-of-type > li:last-of-type');
			var val = [], sortedHTML= [];
			for (let i=0; i<globeList.length; i+=1) {
				val.push(globeList[i].innerHTML)
			}

			function sortAppend() {
				val = val.sort()
				sortedHTML.push(val[0])
				for (let m=0; m<val.length-1; m+=1) {
					if (val[m] === val[m+1]) {
						continue
					} else {
						sortedHTML.push(val[m+1])
					}
				}
				return sortedHTML
			}
			val = sortAppend()

			createDom(val.length, locDiv)
			var liElt = locDiv.querySelectorAll('li')
			for (let i=0; i<liElt.length; i+=1) {
				liElt[i].innerHTML = val[i]
			}
			function replaceDOMLoc(arr,ele) {
				ele.replaceChildren()
				var l = arr.length;
				for (let i=0;i<l; i+=1) {
					var li = document.createElement('li')
					ele.appendChild(li)
					li.innerHTML = arr[i].innerHTML
				}
			}
			var loc = document.querySelectorAll('#parentLoc > li');


			for (let u=0; u<loc.length; u+=1) {
				var len = 0;
				for (let a=0; a<globeList.length; a+=1) {
					if (loc[u].innerHTML.toLowerCase() === globeList[a].innerHTML.toLowerCase()) {
						len+=1
					}
				}
				loc[u].textContent += '  (' + len + ')';
			};// adds the number of sermons hit for each location

			var locationList = document.querySelectorAll('#parentLoc > li'),
			input = document.querySelector('#searchField'),
			iconElements = document.querySelectorAll('.ico-wrap');

			iconElements[3].onclick = function() {
				input.onkeyup = function() {
					var lterm = input.value.toLowerCase(), larr = []
					if (input.getAttribute('placeholder') === 'Search Location') {
						for (let i=0;i<(locationList.length);i+=1) {
							var elt = locationList[i].textContent.toLowerCase();
							if (elt.indexOf(lterm) !== -1) {
								larr.push(locationList[i])
								replaceDOMLoc(larr, document.querySelector('#parentLoc'))
							}
						}
					}
					named(locDiv.querySelectorAll('li'))
				}
				named(locDiv.querySelectorAll('li'))
			}
			function named(li) {
				Array.from(li).forEach(function(i) {
					i.onclick = function() {
						
						input.value = ''
						input.dispatchEvent(new KeyboardEvent('keyup'))
						reassignHeight(215)
						 sermonList.scrollTop = 0;

						$('#searchField').attr('placeholder', 'Search Date or Title');
						document.querySelector('#locHeader').innerHTML = i.innerHTML.slice(0,-5);

						locDiv.style.display = 'none';
						matched.style.display = 'block';

						for (let e=0; e<globeList.length; e+=1) {
							if (i.innerHTML.toLowerCase().slice(0,-4) === globeList[e].innerHTML.toLowerCase() || i.innerHTML.toLowerCase().slice(0,-5) === globeList[e].innerHTML.toLowerCase() || i.innerHTML.toLowerCase().slice(0,-6) === globeList[e].innerHTML.toLowerCase() || i.innerHTML.toLowerCase().slice(0,-7) === globeList[e].innerHTML.toLowerCase()) {
								var appended = globeList[e].parentElement.parentElement
								var cloned = appended.cloneNode(true)
								matched.appendChild(cloned)
							}
						}
						$('#matched li.sm-code').css({'color': '#81b7fb'})
						$('#matched ul :not(.sm-code)').removeAttr('style')

						$('.scroll-opts').css({'display': 'flex'})
						$('.opts01').css({'display':'none'})

						$('#tab01').css({'display':'flex'})

						$('#tab01').addClass('fadeIn');
						setTimeout(function() {
							$('#tab01').removeClass('fadeIn');
						},400)
						
						$('#back').on('click', function() {
							reassignHeight(170)
							locDiv.style.display = 'block';

							matched.replaceChildren()
							matched.style.display = 'none';

							$('.scroll-opts').css({'display': 'none'})

							$('#searchField').attr('placeholder', 'Search Location')
						})
					}
				})
			}
		}
		popDom1()
	}
	setProp()
	
	
})()
