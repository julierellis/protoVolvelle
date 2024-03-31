
const CATEGORIES = [
{category: "Conceptual/symbolic out of awareness place of knowing", 
	options: ["Past experience", "Implicit memory", "Schema"]},
{category: "Human Polyvagal-Body state, neuroception of threat or cues of safety", 
	options: ["👤 Dorsal vagal 👤","👤  Sympathetic 👤",  "👤  Ventral vagal+Sympathetic 👤", "👤 Ventral vagal 👤"]},
{category: "Human Polyvagal experience", 
	options: ["👤 Curious/Open 👤", "👤 Connection 👤", "👤 Coregulation 👤", "👤 Disconnection 👤", "👤 Shut down 👤"]},
{category: "Sensory", 
	options: ["Interoception","5 Senses Perception"]},
{category: "Environmental Context", 
	options: ["Weather","Indoor/outdoor","# horses", "grass-grazing", "no grazing possible"]},
{category: "Horse Polyvagal - neuroception of threat or cues of safety", 
	options: ["🐴 horse Dorsal vagal - disconnect 🐴","🐴 horse Sympathetic-fight/flight 🐴", "🐴 horse Ventral vagal+Sympathetic 🐴","🐴 horse Ventral vagal 🐴"]},
{category: "Horse Polyvagal experience", 
	options: ["🐴 Curious/Open 🐴", "🐴 Connection 🐴", "🐴 Coregulation 🐴", "🐴 Disconnection 🐴", "🐴 Shut down 🐴"]},
{category: "Horse or Human Behavior", 
	options: ["Move toward", "Offer to connect", "Reciprocity", "Non-reciprocity", "Intrusive", "Move away"]},
{category: "Cognitive awareness", 
	options: ["Thoughts in images", "Embodied-gestures", "Conceptual metaphor", "Words/labels", "Explicit memory"]},
{category: "Interpretation", 
	options: ["Metaphors", "Narrative", "Plot","Story"]},
];
					
const RADIUSmin = 100;
const RADIUSinterval = 30;
const cos = Math.cos;
const sin = Math.sin;
const π = Math.PI;

const INDEXmax = 3;

	
/* [
Copyright © 2020 Xah Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

URL: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
Version 2019-06-19

] */

const f_svg_ellipse_arc = (([cx,cy],[rx,ry], [t1, Δ], φ ) => {
	/* [
	returns a SVG path element that represent a ellipse.
	cx,cy → center of ellipse
	rx,ry → major minor radius
	t1 → start angle, in radian.
	Δ → angle to sweep, in radian. positive.
	φ → rotation on the whole, in radian
	URL: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
	Version 2019-06-19
	 ] */
	
	const f_matrix_times = (( [[a,b], [c,d]], [x,y]) => [ a * x + b * y, c * x + d * y]);
	const f_rotate_matrix = (x => [[cos(x),-sin(x)], [sin(x), cos(x)]]);
	const f_vec_add = (([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2]);

	Δ = Δ % (2*π);
	const rotMatrix = f_rotate_matrix (φ);
	const [sX, sY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rx * cos(t1), ry * sin(t1)] ), [cx,cy] ) );
	const [eX, eY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rx * cos(t1+Δ), ry * sin(t1+Δ)] ), [cx,cy] ) );
	const fA = ( (  Δ > π ) ? 1 : 0 );
	const fS = ( (  Δ > 0 ) ? 1 : 0 );
	const path_2wk2r = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path_2wk2r.setAttribute("d", "M " + sX + " " + sY + " A " + [ rx , ry , φ / (2*π) *360, fA, fS, eX, eY ].join(" "));
	
	return path_2wk2r;
});

// Here's the main program. 
let ypos = 20;
for (let level of CATEGORIES){
	let i = CATEGORIES.indexOf(level)
	
//	console.log("working with category ", level.category);
	let radius = RADIUSmin + i*RADIUSinterval;
	ypos = ypos + ((radius+20));
	
	// Need an SVG group element to connect the pieces together
	const disk = document.createElementNS("http://www.w3.org/2000/svg", "g");
	disk.setAttribute('id', `disk${i}`);
	if (i<INDEXmax){
		document.querySelector("#allDisks").appendChild(disk);
	}
	
	const sweep = (2*π)/level.options.length;
	
	for (let option of level.options){		
		let j = level.options.indexOf(option)

		const myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	
		const myPath = f_svg_ellipse_arc([400, ypos],[radius,radius], [+j*sweep, sweep], 0 );	
		myPath.setAttribute('stroke', "transparent");
		myPath.setAttribute('fill', "transparent");
		myPath.setAttribute('id', `thePath${i},${j}`);
	
		const myTextPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
		myTextPath.setAttribute('href', `#thePath${i},${j}`);
		myTextPath.textContent = option;
		if (i<INDEXmax){
			document.querySelector(`#disk${i}`).appendChild(myText).appendChild(myTextPath);
			document.querySelector(`#disk${i}`).appendChild(myPath);
		}
	}

	if (i%2 == 0){
		// even disks
		drawDisk(400, ypos, radius, 'white', 'purple', i)
	}
	else{
		// odd disks
		drawDisk(400, ypos, radius, 'lightpink', 'purple', i)
	}
	ypos = ypos + (radius+20)+10; 
}
// console.log(document.body.innerHTML);


// Here are the functions I wrote.
function drawDisk(x, y, radius, colorDisk, colorLine, i)	{
	const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	hole.setAttribute('cx', x);
	hole.setAttribute('cy', y);   
	hole.setAttribute('fill', 'grey'); 
//	hole.setAttribute('fill-opacity', '0.1');  
	hole.setAttribute('stroke', 'black');
//	hole.setAttribute('stroke-width',"2px")
//	hole.setAttribute('stroke-dasharray',"8,3")
	hole.setAttribute('r', `10`);
	
//	console.log(colorDisk);

/*	const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	innerCircle.setAttribute('cx', x);
	innerCircle.setAttribute('cy', y);   
	innerCircle.setAttribute('fill', colorDisk);   
	innerCircle.setAttribute('stroke', colorLine);
	innerCircle.setAttribute('r', `${radius-10}`);
*/
	const outerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	outerCircle.setAttribute('cx', x);
	outerCircle.setAttribute('cy', y);   
	outerCircle.setAttribute('fill', colorDisk); 
	outerCircle.setAttribute('fill-opacity', '0.1');  
	outerCircle.setAttribute('stroke', 'lightgrey');
	outerCircle.setAttribute('stroke-width',"2px")
	outerCircle.setAttribute('stroke-dasharray',"8,3")
	outerCircle.setAttribute('r', `${+radius+20}`);

	if (i<INDEXmax){
		document.querySelector(`#disk${i}`).appendChild(hole); 
		document.querySelector(`#disk${i}`).appendChild(outerCircle);
	} 

}
