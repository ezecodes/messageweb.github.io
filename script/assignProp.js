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
	bw = document.querySelector('#bw');

	var pb = document.querySelector('#pb');
	var icoAudio = playIco.querySelector('div');
	var topVal = document.querySelector('#wrapper > p:first-child').getBoundingClientRect().top;

	playIco.addEventListener('click', function() {
		var elt = document.querySelector('#audio');
		if (icoAudio.id === 'pause-ico') {
			icoAudio.id = 'playing';
			if (!document.querySelector('#audio')) {//checks if the audio element exits
				var audioElt = document.createElement('audio');
				audioElt.src = 'm4a/62-0621B The Path Of Life VGR.m4a';
				audioElt.id = 'audio';
				document.body.appendChild(audioElt)
				audioElt.play()
				document.querySelectorAll('.sermon')[0].scrollTop = topVal;
				this.style.background = '#0271ff7a'				
			} else {
				elt.play()
				this.style.background = '#0271ff7a'				
			}
		} else if (icoAudio.id === 'playing') {
				this.removeAttribute('style')				
			icoAudio.id = 'pause-ico';
			if (document.querySelector('#audio')) {
				elt.pause()
			}
		}
		document.querySelector('#audio').addEventListener('playing', function () {
			handlePlaying(this)
			updateCurrentTime(this)
			pb.setAttribute('max', Math.floor(this.duration))
			getAudioLength(document.querySelectorAll('.aud-length')[0], this.duration)

			pb.addEventListener('click', function(e) {
				var elt = document.querySelector('#audio');
				var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
	   			elt.currentTime = pos * elt.duration;
			})
		})
		document.querySelector('#audio').onended = function() {
			icoAudio.id = 'pause-ico';
		}
	})
	

	/** Handle Audio Playback **/
	function getAudioLength(ele, duration) {
		//converts audio duration(secs) to hr:min:sec format
		var sec, dur, hr, rem, min, dotPos, t;
		dur = Math.floor(duration);
		hr = Math.floor(dur / 3600);
		rem = dur % 3600;
		min = rem / 60;
		dotPos = min.toString().indexOf('.');
		if ((dur % 60) === 0) {
		  sec = 0
		} else {
			sec = Math.round((Number(min.toString().slice(dotPos, dotPos+4))) * 60)
		}
		min = Math.floor(min)
		t = `${(hr.toString().length < 2) ? hr = '0' + hr : hr = hr}:${(min.toString().length < 2) ? min = '0' + min : min = min}:${(sec.toString().length < 2) ? sec = '0' + sec : sec = sec}`

		ele.textContent = t
	}
	function handlePlaying(_this) {
		setInterval(function() {
			pb.setAttribute('value', Math.floor(_this.currentTime))
		},1000)

	}
	function updateCurrentTime(_this) {
		setInterval(()=>{
			getAudioLength(document.querySelector('#currentTime'), _this.currentTime)
		},1000)
	}
	function updatePB(val) {
		if (document.querySelector('#audio')) {
			var aud = document.querySelector('#audio')
			audio.currentTime += val
			pb.setAttribute('value', Math.floor(document.querySelector('#audio').currentTime))
		}
	}
	fw.addEventListener('click', function() {
		updatePB(10)
	})
	bw.addEventListener('click', function() {
		updatePB(-10)
	})
	/**  **/

	function setProp(){

		var winHeight = window.innerHeight, 
		winWidth = window.innerWidth,
		headerElt = document.querySelectorAll('#body header')[0],
		initSize = headerElt.style.fontSize;
		window.onresize = function() {
			assignH()
			// window.location = window.location
		}
		assignH()
		function assignH() {
			reassignHeight(182)

			var winHeight1 = window.innerHeight, 
			winWidth1 = window.innerWidth;

			if (winHeight1 < 380) {
				headerElt.style.height = 'auto';
			} else {
				var addedH = (document.querySelectorAll('.hdr > header')[0].getBoundingClientRect().height + document.querySelector('#ft').getBoundingClientRect().height); 

				headerElt.style.height = winHeight1 - Math.round(addedH) - 30 + 'px'
			}
			
			sidePage.style.height = winHeight1 + 'px';
			mainFill.style.height = winHeight1 - 1 + 'px';
		}
		function reassignHeight(val) {
			// if ($('#par'))
			sermonList.style.height = (winHeight - val) + 'px';
		}
		
		function fadOf() {
			$('.common-list.currentList').addClass('fadeOut')
			spanIco.classList.add('close');
			setTimeout(function() {
				$('.common-list.currentList').css({'display':'none'})
			},300)
		}
		spanIco.addEventListener('click', function() {
			// var classArr = Array.from(spanIco.classList)
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
		// function toggleElem(elt) {
		// 	elt.forEach((i)=>{
		// 		i.addEventListener('click', function(){
		// 			for (let j=0; j<elt.length; j+=1) {
		// 				if (elt[j] !== i) elt[j].removeAttribute('style')
		// 			}
		// 			$(i).css({
		// 				"background": '#0271ff7a',
		// 				"color": '#fff',
		// 				"border": 'none'
		// 			})
		// 			fadOf()
		// 		})
		// 	})
		// }/*adds the required style for the clicked element,
			// and removes the style attribute for the non-clicked elements*/
		// toggleElem(listParent2.childNodes)

		function generateYears() {
			var max = 5;
			createDom(max, listParent)
			
			var nodes = listParent.childNodes;
			
			for (let j=0, yrIndex = 1947; j<nodes.length; j+=1) {
				nodes[j].innerHTML = yrIndex
				yrIndex+=1
			}
			// toggleElem(nodes)
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
			// toggleElem(nodes)
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
						reassignHeight(182)
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
								// console.log('appended')
								// if ()
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
							reassignHeight(140)
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
