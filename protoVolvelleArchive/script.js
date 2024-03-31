
// const form = document.querySelector("#myForm");
// const log = document.querySelector("#log");

const CATEGORIES = [
{category: "Conceptual/symbolic out of awareness place of knowing", 
	options: ["Past experience", "Implicit memory", "Schema"]},
{category: "Human Polyvagal-Body state, neuroception of threat or cues of safety", 
	options: ["👤 Dorsal vagal 👤","👤  Sympathetic 👤",  "👤  Sympathetic+Ventral vagal 👤", "👤 Ventral vagal 👤"]},
{category: "Human Polyvagal experience", 
	options: ["👤 Curious/Open 👤", "👤 Connection 👤", "👤 Coregulation 👤", "👤 Disconnection 👤", "👤 Shut down 👤"]},
{category: "Sensory", 
	options: ["Interoception","5 Senses Perception"]},
{category: "Environmental Context", 
	options: ["Weather","Indoor/outdoor","# horses", "grass-grazing", "no grazing possible"]},
{category: "Horse Polyvagal - neuroception of threat or cues of safety", 
	options: ["🐴 Dorsal vagal - disconnect 🐴","🐴 Sympathetic-fight/flight 🐴", "🐴 Sympathetic+Ventral vagal 🐴","🐴 Ventral vagal 🐴"]},
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

for (let level of CATEGORIES){
	let i = CATEGORIES.indexOf(level)
	console.log("working with category ", level.category);
	let radius = RADIUSmin + i*RADIUSinterval;
//	let diskText = level.category;
	let diskText = "";
	console.log(`${level.options}`);
	
	for (let option of level.options){
		diskText += `   ${option}  `;
		console.log(`so far ... ${diskText}`);
	}

	drawDisk(400, 400, radius, `${diskText}`, 'green ', 'purple')
}


//drawDisk(300,300,74,"notext","yellow","green");
//drawDisk(200, 300, 125, "noTextYet", "green", "purple");

function circle2Path(cx, cy, r){
		return 	['M', cx, cy, 
				'm', -r, '0' ,
				'a', r, r , '0' , '1', '1' ,  (r*2),'0',
				'a', r, r , '0' , '1', '1' ,  -(r*2),'0'].join(' ');
}
function circle2WholePath(cx, cy, r){
		return 	['M', cx, cy, 
				'm', -(r/2), -r/2 ,
				'A', r, r , '0' , '0', '1' ,  cx+r,cy,
				'A', r, r , '0' , '1', '1' ,  cx-r,cy].join(' ');
}
	
function drawDisk(x, y, radius, diskText, colorDisk, colorLine)	{
	const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	const textCircle = document.createElementNS("http://www.w3.org/2000/svg", "path");
	
	const outerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	const myText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");

	textCircle.setAttribute('d', `${circle2Path(x, y, radius)}` );
	textCircle.setAttribute('stroke', 'yellow');
	textCircle.setAttribute('fill', 'transparent');
	textCircle.setAttribute('id', `textCircle${radius}`);

	myText.setAttribute('id', `myText`);
	textPath.textContent = diskText;
	textPath.setAttribute('href',`#textCircle${radius}`);
	textPath.setAttribute('id', 'thePath')

	innerCircle.setAttribute('cx', x);
	innerCircle.setAttribute('cy', y);   
	innerCircle.setAttribute('fill', 'transparent');   
	innerCircle.setAttribute('stroke', colorLine);
	innerCircle.setAttribute('r', `${radius-10}`);

	outerCircle.setAttribute('cx', x);
	outerCircle.setAttribute('cy', y);   
	outerCircle.setAttribute('fill', `transparent`);   
	outerCircle.setAttribute('stroke', 'grey');
	outerCircle.setAttribute('stroke-dasharray',"5,5")
	outerCircle.setAttribute('r', `${+radius+20}`);

	document.querySelector("#drawHere").appendChild(textCircle);      
	document.querySelector("#drawHere").appendChild(innerCircle); 
	document.querySelector("#drawHere").appendChild(outerCircle); 
	document.querySelector("#drawHere").appendChild(myText).appendChild(textPath); 
}
