
const CATEGORIES = [
{category: "  Conceptual/symbolic", //" out of awareness place of knowing", 
	options: ["Past experience", "Implicit memory", "Schema"]},
{category: "👤 Polyvagal-Body state 👤", //" neuroception of threat or cues of safety 👤 ", 
	options: ["👤 Dorsal vagal 👤","👤  Sympathetic 👤",  "👤  Ventral vagal+Sympathetic 👤", "👤 Ventral vagal 👤"]},
{category: "👤 Polyvagal experience 👤", 
	options: ["👤 Curious/Open 👤", "👤 Connection 👤", "👤 Coregulation 👤", "👤 Disconnection 👤", "👤 Shut down 👤"]},
{category: "Sensory", 
	options: ["Interoception","5 Senses Perception"]},
{category: "Environmental Context", 
	options: ["Weather","Indoor/outdoor","# horses", "grass-grazing", "no grazing possible"]},
{category: "🐴 Horse Polyvagal - neuroception  🐴", //of threat or cues of safety 🐴 ", 
	options: ["🐴 horse Dorsal vagal - disconnect 🐴","🐴 horse Sympathetic-fight/flight 🐴", "🐴 horse Ventral vagal+Sympathetic 🐴","🐴 horse Ventral vagal 🐴"]},
{category: "🐴 Horse Polyvagal experience 🐴 ", 
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

//Let's just draw the Window ... (this would be fun to animate)
	const innerPath = f_svg_ellipse_arc([400,400],[85,85], [0.25*π, 0.5*π], 0 );
	const outerPath = f_svg_ellipse_arc([400,400],[400,400], [-1.25*π, 1.5*π], 0 );
	const newPathString = outerPath.getAttribute("d")+" L"+innerPath.getAttribute("d").slice(1) +"  Z";
	outerPath.setAttribute('d', newPathString);	
	outerPath.setAttribute('fill','lightgrey');
	outerPath.setAttribute('stroke',"grey");
	outerPath.setAttribute('stroke-width',"2px");
	outerPath.setAttribute('stroke-dasharray',"8,3");
	
	document.querySelector("#SVGspace").appendChild(outerPath); 

// add the hole ...
	const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	hole.setAttribute('cx', 400);
	hole.setAttribute('cy', 400);   
	hole.setAttribute('fill', 'grey'); 
	hole.setAttribute('stroke', 'black');
	hole.setAttribute('r', `10`);
	document.querySelector("#SVGspace").appendChild(hole); 
	
// Now add the level descriptions ...

	for (let level of CATEGORIES){
		console.log (level);
		let i = CATEGORIES.indexOf(level)
	
	//	console.log("working with category ", level.category);
		let radius = RADIUSmin + i*RADIUSinterval;
	
		// Need an SVG group element to connect the pieces together
		const disk = document.createElementNS("http://www.w3.org/2000/svg", "g");
		disk.setAttribute('id', `disk${i}`);
		document.querySelector("#SVGspace").appendChild(disk);
	
		const sweep = π;
	
		for (let j = 0; j < 2; j++){				
			const myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	
			const myPath = f_svg_ellipse_arc([400,400],[radius,radius], [-(1.23*π)+j*π*1.05, sweep], 0 );	
			myPath.setAttribute('stroke', "transparent");
			myPath.setAttribute('fill', "transparent");
			myPath.setAttribute('id', `thePath${i},${j}`);
	
			const myTextPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
			myTextPath.setAttribute('href', `#thePath${i},${j}`);
			myTextPath.textContent = level.category;
	
			document.querySelector(`#disk${i}`).appendChild(myText).appendChild(myTextPath);
			document.querySelector(`#disk${i}`).appendChild(myPath);
		}
			if (i%2 == 0){
			// even disks
			drawDisk(400, 400, radius, 'transparent', 'purple', i)
		}
		else{
			// odd disks
			drawDisk(400, 400, radius, 'lightpink', 'purple', i)
		}
		// now add a feedback request 
		const fbText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		
		const fbPath = f_svg_ellipse_arc([400,400],[370,370], [-(1.0*π), sweep], 0 );	
		fbPath.setAttribute('stroke', "transparent");
		fbPath.setAttribute('fill', "transparent");
		fbPath.setAttribute('id', `fbPath`);

		const fbTextPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
		fbTextPath.setAttribute('href', `#fbPath`);
		fbTextPath.textContent = "Please help us improve this device; send comments to noreenesposito@gmail.com";

		document.querySelector(`#disk${i}`).appendChild(fbText).appendChild(fbTextPath);
		document.querySelector(`#disk${i}`).appendChild(fbPath);
	
	}
	const logo = document.createElementNS("http://www.w3.org/2000/svg", "image");
	logo.setAttribute('x', "250");
	logo.setAttribute('y', "10");
	logo.setAttribute('width', "320");
	logo.setAttribute('height', "212"); 
	logo.setAttribute('href', "EAST_Logo_Hat_Esposito-removebg-preview.png");
	document.querySelector(`#SVGspace`).appendChild(logo);

	const logoWords = document.createElementNS("http://www.w3.org/2000/svg", "text");
	logoWords.setAttribute('x', "300");
	logoWords.setAttribute('y', "210");
	logoWords.setAttribute('fontSize', "18px");
//	logo.setAttribute('height', "212"); 
	logoWords.textContent = "Equine-Assisted Story Transformation";
	document.querySelector(`#SVGspace`).appendChild(logoWords);
	
	const book = document.createElementNS("http://www.w3.org/2000/svg", "image");
	book.setAttribute('x', "350");
	book.setAttribute('y', "230");
	book.setAttribute('width', "100");
	book.setAttribute('height', "150"); 
	book.setAttribute('href', "bookCover.jpg");
	document.querySelector(`#SVGspace`).appendChild(book);
	
	
	

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
		outerCircle.setAttribute('stroke', 'white');
		outerCircle.setAttribute('stroke-dasharray',"5,5")
		outerCircle.setAttribute('r', `${+radius+20}`);

	//	document.querySelector(`#disk${i}`).appendChild(hole); 
	//	document.querySelector("#drawHere").appendChild(innerCircle); 
		document.querySelector(`#disk${i}`).appendChild(outerCircle); 

	}
	