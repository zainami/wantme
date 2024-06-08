<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2487.6">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">let score = 0;</p>
<p class="p1">let currentQuestion = 1;</p>
<p class="p1">let totalQuestions = 16;</p>
<p class="p1">let timer;</p>
<p class="p2"><br></p>
<p class="p1">function startQuiz() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('intro').style.display = 'none';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('q1').style.display = 'block';</p>
<p class="p1"><span class="Apple-converted-space">    </span>timer = setTimeout(showResults, 15 * 60 * 1000); // 15 minutes timer</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function nextQuestion(questionId, correctAnswer, points) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (selectedOption) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>const answerValue = selectedOption.value;</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (Array.isArray(correctAnswer)) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>const selectedValues = Array.from(document.querySelectorAll(`input[name="${questionId}"]:checked`)).map(input =&gt; input.value);</p>
<p class="p1"><span class="Apple-converted-space">            </span>if (correctAnswer.sort().toString() === selectedValues.sort().toString()) {</p>
<p class="p1"><span class="Apple-converted-space">                </span>score += points;</p>
<p class="p1"><span class="Apple-converted-space">            </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">                </span>score -= points;</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (answerValue === correctAnswer) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>score += points;</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">            </span>score -= points;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>document.getElementById(questionId).style.display = 'none';</p>
<p class="p1"><span class="Apple-converted-space">        </span>currentQuestion++;</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (currentQuestion &lt;= totalQuestions) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>document.getElementById(`q${currentQuestion}`).style.display = 'block';</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">            </span>showResults();</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">        </span>alert('Please select an option.');</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function bufferQuestion(questionId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById(questionId).style.display = 'none';</p>
<p class="p1"><span class="Apple-converted-space">    </span>alert('No, it\'s you! Hahaha.');</p>
<p class="p1"><span class="Apple-converted-space">    </span>currentQuestion++;</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (currentQuestion &lt;= totalQuestions) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>document.getElementById(`q${currentQuestion}`).style.display = 'block';</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">        </span>showResults();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function showResults() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>clearTimeout(timer);</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById(`q${currentQuestion}`).style.display = 'none';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('results').style.display = 'block';</p>
<p class="p1"><span class="Apple-converted-space">    </span>const resultMessage = score &gt;= 100 ? `Congratulations! Your total score is: ${score}` : `You failed! Zaina won't forgive you! Your total score is: ${score}`;</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('score').innerText = resultMessage;</p>
<p class="p1">}</p>
</body>
</html>
