(
	function() {
		var playIco = document.querySelector('#play'),
			fw = document.querySelector('#fw'),
			bw = document.querySelector('#bw'),
			pb = document.querySelector('#pb'),
			icoAudio = playIco.querySelector('div'),
			topVal = document.querySelector('#wrapper').getBoundingClientRect().top,
			int,
			isPlaying = false;

		function addListenerToNewList() {
			$('.sm-list').on('click', function (e) {
				stopPlayback()
			})
		}
		const observer = new MutationObserver(addListenerToNewList)
		observer.observe($('#oList')[0], {childList: true})
		observer.observe($('#matched')[0], {childList: true})

		$('#parentLoc').on('click', function() {
			$('#matched > .sm-list').on('click', function(){
				stopPlayback()
			})
		})
		$('.sm-list').on('click', function (e) {
			stopPlayback()
		})
		function stopPlayback() {
			if (document.querySelector('#audio')) {
				document.querySelector('#audio').pause()
				pb.setAttribute('max', '')
				pb.setAttribute('value', '0')
				document.querySelector('#currentTime').textContent = '00:00:00'
				document.querySelectorAll('.aud-length')[0].textContent = '00:00:00'
				icoAudio.id = 'pause-ico'
				clearInterval(int)
				isPlaying = false
			 	document.querySelector('#audio').parentElement.removeChild(document.querySelector('#audio'))
				playIco.removeAttribute('style')
				document.title = 'The Message'
			}
		}

		playIco.addEventListener('click', function() {
			var elt = document.querySelector('#audio');

			if (icoAudio.id === 'pause-ico') {
				icoAudio.id = 'playing';
				clearInterval(int)
				if (!document.querySelector('#audio')) {//if the audio eleemnt does not exist, create it
					clearInterval(int)
					var audioElt = document.createElement('audio')
					audioElt.src =
					 `audio_files/${$('#date-code')[0].textContent} ${$('#sermon-title')[0].textContent}.mp3`

					audioElt.id = 'audio';
					document.body.appendChild(audioElt)
					audioElt.play()
					isPlaying = true
					sessionStorage.setItem('audioOn','true')

					audioEnd()
					audioElt.setAttribute('mode', 'playing')
					document.querySelectorAll('.sermon')[0].scrollTop = Math.floor(topVal) - 100;


				} else {//if it exists, then play
					elt.setAttribute('mode', 'playing')
					elt.play()
					isPlaying = true

				}
			} else if (icoAudio.id === 'playing') {
					this.removeAttribute('style')
					icoAudio.id = 'pause-ico';
					isPlaying = false
				if (elt) {
					elt.removeAttribute('mode')
					elt.pause()
				}

			}
			if (isPlaying) {
				playIco.style.background = '#0271ff7a'

				const _this = document.querySelector('#audio')
				int = setInterval(()=>{
					pb.setAttribute('value', Math.floor(_this.currentTime))
					getAudioLength(document.querySelector('#currentTime'), _this.currentTime)
				}, 1000)
				setTimeout(()=>{
					getAudioLength(document.querySelectorAll('.aud-length')[0], _this.duration)
					pb.setAttribute('max', Math.floor(_this.duration))
				}, 1000)
				document.title = `${$('#date-code')[0].textContent} ${$('#sermon-title')[0].textContent}`

				function updatePB(val) {
					//handles the next and prev buttons
					if (document.querySelector('#audio')) {
						var aud = document.querySelector('#audio')
						aud.currentTime += val
						pb.setAttribute('value', Math.floor(document.querySelector('#audio').currentTime))
					}
				}
				fw.addEventListener('click', function() {
					updatePB(10)
				})
				bw.addEventListener('click', function() {
					updatePB(-10)
				})

				pb.addEventListener('click', function(e) {
					if ($('#audio')[0]) {
						var elt = $('#audio')[0];
						var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
			   			_this.currentTime = pos * _this.duration;
			   		}
				})

			} else {
				clearInterval(int)
				document.title = 'The Message'
			}
			
		})
		function audioEnd() {
			document.querySelector('#audio').onended = function() {
				icoAudio.id = 'pause-ico';
			}
		}
		
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
			if ((/[0-9]/.test(t))) {
				ele.textContent = t
			}
		}

	}()
)
