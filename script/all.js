
(function() {

"use strict"
var listMain = document.querySelectorAll('.sermon-list')[0],
	orderedList = document.querySelector('#oList'),
	parent = document.querySelectorAll('#oList > li'),
	matchedInitLi,
	listAlpha = orderedList.querySelectorAll('li > ul:first-child > li:first-child'),
	listNum = orderedList.querySelectorAll('li > ul:first-child > li:last-of-type'),
	input = document.querySelector('#searchField'),
	sidePage = document.querySelector('#sd-pg'),
	books=document.querySelector('#books'),
	winHeight = window.innerHeight,
	playIco = document.querySelector('#play'),
	icoAudio = playIco.querySelector('div'),
	winWidth = ()=> {return window.innerWidth};

function vals() {
	this.matchedDiv = document.querySelector('#matched');
	this.a = document.querySelectorAll('#matched > li');
	this.b = document.querySelectorAll('#matched > li > ul:first-child > li:last-of-type');//num
	this.c = document.querySelectorAll('#matched > li > ul:first-child > li:first-child');//alpha
};

function getClientTop() {
	var valArr = [];
	for (let l=0; l<parent.length; l+=1) {
		valArr.push(parent[l].getBoundingClientRect().top - 215)
	}
	return valArr
}

var valArr, isTrue;

books.addEventListener('click', function() {//hide or display the side page
	const closeBtn = document.querySelector('#nav_hide')
	const fillPage = document.querySelector('#main-fill')
	setTimeout(function() {
		$(sidePage).removeClass('fadeOut')
	},300);

	if (sidePage.classList.contains('show')) {
		sidePage.classList.remove('show') 
	} else {
		const setInitialState = ()=> {

		}
		const changeW = (viewportWidth)=> {
			if (viewportWidth <= 646) {
				sidePage.style.minWidth = '100vw'
				sidePage.style.display = 'initial'
				fillPage.style.display = 'none'
				closeBtn.style.display = 'block'

			} else {
				sidePage.style.minWidth = '380px'
				fillPage.style.display = 'flex'
				closeBtn.style.display = 'none'
			}
		}
		changeW(winWidth())
		closeBtn.addEventListener('click', ()=> {
			sidePage.classList.remove('show')
			sidePage.style.display = 'none'
			fillPage.style.display = 'flex'

		})
		window.onresize = ()=> {
			changeW(winWidth())
			if (winWidth() > 646) {
				sidePage.minWidth = '350px'
			}
		}
		sidePage.classList.add('show');
		if (!isTrue) {
			valArr = getClientTop()
			isTrue = true
		}
	}

	scrollFn($('li.sm-code'))
})
var inp = input.value;
window.onload = function() {
	searchHandler()
	addClassName()
	setTimeout(()=>{
		$('.ld').css({position: 'initial', zIndex: 0})
	},100)
	// scrollFn($('li.sm-code'))
}
function scrollFn(opt) {
	var commonList = document.querySelectorAll('.common-list.currentList')[0];
	var dropDownList = commonList.querySelectorAll('ol > li')
	function fadOf() {
		$('.common-list.currentList').addClass('fadeOut')
		spanIco.classList.add('close');
		setTimeout(function() {
			$('.common-list.currentList').css({'display':'none'})
		},300)
	}
	dropDownList.forEach((i)=>{
		i.onclick = function() {
			fadOf()
			var val = i.innerHTML;
			if ((/[0-9]:[0-9]/.test(val))) {//scrolling to duration
				for (let i=0; i<opt.length; i+=1) {
					const dur = opt[i].innerHTML
					if (val === dur) {
						listMain.scrollTop = valArr[i]
						break
					}else if (val < dur) {
						listMain.scrollTop = valArr[i]
						break
					}
				}
			}
			if (val.charCodeAt() <= 57) {//scrolling to year
				var valView = i.textContent.slice(2);
				for (let i=0; i<opt.length; i+=1) {
					var slc = opt[i].textContent.slice(0,2)
					if (slc === valView) {
						listMain.scrollTop = valArr[i]
						break
					}
				}
			}else {//scrolling to title
				for (let i=0; i<opt.length; i+=1) {
					if (val === opt[i].innerHTML.charAt(0)) {
						listMain.scrollTop = valArr[i]
						break
					}
				}
			}
		}
	})
}

function rmvStyleAttr(negEle) {
	negEle.forEach((i)=>{
		i.removeAttribute('style')
	})
}

const iconElements = document.querySelectorAll('.ico-wrap');
function addClassName() {
	
	function NameCheck(currentElt) {
		var i;
		this.currentElt=currentElt;
		for (i=0;i<iconElements.length;i+=1) {
			if (iconElements[i]!==this.currentElt) {
				iconElements[i].classList.remove('currentBg')
			} else {
				this.currentElt.classList.add('currentBg')
			}
		}
	}
	
	var ele = document.querySelectorAll('.common-list'),
		spanIco=document.querySelector('#spanIco'),
		smCode = document.querySelectorAll('.sm-code'),
		smTitle = document.querySelectorAll('.sm-title');
	function rmClass(index) {// the value of index is the dropdown element index in-order
		for (let i=0; i<ele.length; i+=1) {
			if (i !== index) {
				ele[i].classList.remove('currentList')
				ele[i].style.display = 'none';
			} else {
				ele[i].classList.add('currentList')
			}
		}
		spanIco.classList.add('close')
	}//add a class of currentList to only current dropdown list
	
	iconElements.forEach(function(elt) {
		var tf;
		elt.addEventListener('click', function() {

			this.classList.contains('currentBg') ? tf = true : tf = false
			//conditional avoids the repitition of function calls on current element A.K.A this

			if (!tf) {
				var formerVal = input.value;
				$('#oList').addClass('fadeIn')
				$('#parentLoc').addClass('fadeIn')
				if (this === iconElements[0]) {
					rmClass(0)
					sortYears()
					rmvStyleAttr(document.querySelectorAll('li.sm-list > ul :not(.sm-code)'))
					$('li.sm-code').css({"color": '#81b7fb'})
					scrollFn($('li.sm-code'))
					
				}
				if (this === iconElements[1]) {
					rmClass(1)
					sortTitles()
					rmvStyleAttr(document.querySelectorAll('li.sm-list > ul :not(.sm-title)'))
					$('li.sm-title').css({"color": '#81b7fb'})
					scrollFn($('li.sm-title'))
					
				}
				if (this === iconElements[2]) {
					sortDuration()
					rmClass(2)
					rmvStyleAttr(document.querySelectorAll('li.sm-list > ul :not(.sm-duration)'))
					$('li.sm-duration').css({"color": '#81b7fb'})
					scrollFn($('li.sm-duration'))
					
				}
				if (this === iconElements[3]) {

					listMain.style.height = winHeight - 170 + 'px';;
					$('.sm-wrap').css({'display':'none'});
					$('#parentLoc').css({'display': 'block'});
					$('.scroll-opts').css({'display': 'none'})
					// (function handleLocSearch() {
					input.setAttribute('placeholder','Search Location');
					input.value = ''
					input.dispatchEvent(new KeyboardEvent('keyup'))

				} 
				if (this !== iconElements[3]) {
					$('#tab01').removeAttr('style')
					listMain.style.height = winHeight - 215 + 'px';
					$('.sm-wrap').removeAttr('style')
					$('#parentLoc').css({'display': 'none'})
					$('.scroll-opts').css({'display': 'flex'})
					$('.opts01').css({'display': 'initial'})
					document.querySelector('#matched').replaceChildren()
					input.setAttribute('placeholder','Search Date or Title');
					input.value = inp
					listChild.set([...parent])
				}
				setTimeout(()=>{
					$('#oList').removeClass('fadeIn')
				}, 300)
			}
			
			var obj1 = new NameCheck(this)
		})
	})
}
var dump, isClicked = false;
function sortFn(listEle) {
	var box = [], arr = [], part;

	for (let p=0; p<listEle.length; p+=1) {
		arr.push(listEle[p].textContent)
	}
	var sortedArr = arr.sort();//sorts by default
	var listArr = Array.from(listEle)//converts DOM list to an iterable object
	orderedList.replaceChildren()//clears the orderedList
	for (let i=0; i<sortedArr.length; i+=1) {
		for (let j=0; j<listArr.length; j+=1) {
			if (sortedArr[i] === listArr[j].textContent) {
				part = listArr.splice(j,1)
				box.push(part[0].parentElement.parentElement)
			}
		}
	}
	(function () {
		if (box.length === listEle.length) {
			var n=0;
			orderedList.replaceChildren()
			while (n<box.length) {
				orderedList.appendChild(box[n])
				n+=1
			}
		}
	})()
	dump = sortedArr
}
function createDom(val, parent) {
	var l = val.length
	for (let i=0; i<l; i+=1) {
		var listItem = document.createElement('li');
		listItem.textContent = val[i]
		parent.appendChild(listItem)
	}
}
function genAplhaOpts(txtFrom) {
	var alphaArr = [];
	function sliced() {
		var slicedArr = []
		for (let i=0; i<txtFrom.length; i+=1) {
			slicedArr.push(txtFrom[i].slice(0,1))
		}
		return slicedArr
	}
	var _sliced = sliced(), i = 0

	for (; i<_sliced.length; i+=1) {
		if (_sliced[i] === _sliced[i+1]) {
			continue
		} else {
			alphaArr.push(_sliced[i])
		}
	}
	createDom(alphaArr, $('#list2 > ol')[0])
	isClicked = true
}
function sortTitles() {
	var listElemtsTitle = orderedList.querySelectorAll('li.sm-list > ul:first-child > li:first-child');
	sortFn(listElemtsTitle)
	document.querySelector("#spanIco").innerHTML = '&nbsp;Title';
	if (!isClicked) genAplhaOpts(dump)
	
}

function sortYears() {
	var listElemtsYears = orderedList.querySelectorAll('li.sm-list > ul:first-child > li:last-of-type');
	sortFn(listElemtsYears)
	document.querySelector("#spanIco").innerHTML = '&nbsp;Year';
}
function sortDuration() {
	var durList = orderedList.querySelectorAll('li.sm-list > ul:last-of-type > li:first-child');
	sortFn(durList)
	document.querySelector("#spanIco").innerHTML = '&nbsp;Duration';
}

function higherOrder() {
	if (iconElements[0].classList.contains('currentBg')) {
		sortYears()
		rmvStyleAttr(document.querySelectorAll('li.sm-list > ul :not(.sm-code)'))
		$('li.sm-code').css({"color": '#81b7fb'})
		scrollFn($('li.sm-code'))
	}
	if (iconElements[1].classList.contains('currentBg')) {
		sortTitles()
		rmvStyleAttr(document.querySelectorAll('li.sm-list > ul :not(.sm-title)'))
		$('li.sm-title').css({"color": '#81b7fb'})
		scrollFn($('li.sm-title'))
	}
	if (iconElements[2].classList.contains('currentBg')) {
		sortDuration()
		rmvStyleAttr(document.querySelectorAll('li.sm-list > ul :not(.sm-duration)'))
		$('li.sm-duration').css({"color": '#81b7fb'})
		scrollFn($('li.sm-duration'))
	}
	if (iconElements[3].classList.contains('currentBg')) {
		sortYears()
	}
}
function replaceDOM(matched, ele) {
	var length = matched.length;
	ele.replaceChildren()
	for (let i=0; i<length; i+=1) {
		//creates the list element and its childnodes
		//as it is in origina html
		var smList = document.createElement('li');
		ele.appendChild(smList)

		smList.id = matched[i].id
		smList.classList.add('sm-list');

		var ul01 = document.createElement('ul');
		ul01.classList.add('sm-lft')
		smList.appendChild(ul01)

		var listTitle = document.createElement('li')
		listTitle.innerHTML = matched[i].querySelectorAll('.sm-title')[0].innerHTML;
		listTitle.classList.add('sm-title')
		ul01.appendChild(listTitle)

		var listCode = document.createElement('li')
		listCode.innerHTML = matched[i].querySelectorAll('.sm-code')[0].innerHTML
		listCode.classList.add('sm-code')
		ul01.appendChild(listCode)

		var ul02 = document.createElement('ul');
		ul02.classList.add('sm-rt')
		smList.appendChild(ul02)

		var listDuration = document.createElement('li')
		listDuration.innerHTML = matched[i].querySelectorAll('.sm-duration')[0].innerHTML
		listDuration.classList.add('sm-duration')
		ul02.appendChild(listDuration)

		var listLocation = document.createElement('li')
		listLocation.innerHTML = matched[i].querySelectorAll('.sm-location')[0].innerHTML
		listLocation.classList.add('sm-location')
		ul02.appendChild(listLocation)
	}
	higherOrder()//resort the append list according to the current sort functions
	// console.log(smList)
}
function innerLoop(fc, e) {
	e.replaceChildren()
	for (let i=0; i<fc.length; i+=1) {
		e.appendChild(fc[i])
	}
	higherOrder()
}

function resetChildren() {
	
	if (!iconElements[3].classList.contains('currentBg')) {
		const formerChild = [...parent]
		setTimeout(()=>{
			innerLoop(formerChild, orderedList)
		})
	} else {
		if (document.querySelector('#matched').style.display != 'none') {
			setTimeout(()=>{
				innerLoop(matchedInitLi, document.querySelector('#matched'))
			})
		}
	}
	// listChild.set([...parent])
		
}//checks if the input value is empty then 
//replace with the former list

var listChild = {
	val: [...parent],
	set(elts) {
		this.val = elts
	},
	get() {
		return this.val
	}
};

function displaySermonDetails() {//add click event Listener to lists
	listChild.get().forEach((i)=>{
		i.addEventListener('click', ()=>{
			const title = i.querySelectorAll('.sm-title')[0].textContent
			const code = i.querySelectorAll('.sm-code')[0].textContent

			const hdrCode = $('#date-code')[0]
			const hdrTitle = $('#sermon-title')[0]

			hdrCode.textContent = code
			hdrTitle.textContent = title

			getXmlData(`${code} ${title}`)
		})
	})
}
displaySermonDetails()
getXmlData('47-0412 Faith Is The Substance')//once the page loads

function appendToPage(format) {
	var parser = new DOMParser();
    var doc = parser.parseFromString(format, "text/html");
	const t = $('#title')[0]
	const c = $('#code')[0]
	const g = $('#globe')[0]
	const wrap = $('#wrapper')[0]
	const body = doc.querySelectorAll('body p')
    t.innerHTML = doc.querySelectorAll('.title')[0].innerHTML
    c.innerHTML = doc.querySelectorAll('.date')[0].innerHTML
    g.innerHTML = doc.querySelectorAll('.place')[0].innerHTML
    wrap.replaceChildren()
    body.forEach((i)=>{
    	i.innerHTML = i.innerHTML.replace(/�/g, ' ')
    	wrap.appendChild(i)
    })
}
function getXmlData(path) {
	const url = `document_data/${path}.htm`;
	fetch(url).then((res)=>{
		if (res.status === 200) {
			return res.text()
		}
	}).then((format)=>{
		appendToPage(format)
	})
}
var init;
document.querySelector('#parentLoc').onclick = function() {
	listChild.set([...document.querySelectorAll('#matched > li')])
	displaySermonDetails()
	init = new vals // <<< vals() constructor function is at the top ^
	matchedInitLi = [...init.a]
}//this function grabs the initial nodes, when location list is clicked

function searchHandler() {

	input.addEventListener('input' , function(e) {
		
		const query = input.value.toLowerCase();
		if (!iconElements[3].classList.contains('currentBg')) {
			inp = input.value
			searchIndexer(query, parent, listNum, listAlpha, orderedList)
			listChild.set([...document.querySelectorAll('#oList > li')])
		} //searching the main sermon list
		else {
			if (input.getAttribute('placeholder') === 'Search Date or Title') {
				searchIndexer(query, init.a, init.b, init.c, init.matchedDiv)
				listChild.set([...document.querySelectorAll('#matched > li')])
			} //searching the location indexed sermon lists
		} 
		displaySermonDetails()

	})

	function searchIndexer(term, listItem, listEleNum, listEleAlpha, listParent) {
		var matched = [];
		if (term === '') {
			resetChildren()
		}
		if (term.charCodeAt() <= 57 && term !== '') {//search with datecode
			searching(listEleNum)

		} else if(!term.charCodeAt() <= 57 && term !== '') {//search with sermon title
			searching(listEleAlpha)
		}

		function searching(a) {
			for (let i=0;i<(a.length);i+=1) {
				var elt = a[i].textContent.toLowerCase();
				if (elt.indexOf(term) !== -1 && matched.length <= 20) {
					matched.push(listItem[i])
					replaceDOM(matched, listParent)
				} 
			}
		}
	}//searchIndexer
	
}//searchHandler function

}())
