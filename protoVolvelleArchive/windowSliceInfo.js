// Run this script on its own, out of the browser, with Node.js
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

for (let level of CATEGORIES){
	let r = CATEGORIES.indexOf(level)+1;
	count = 0;
	for (let option of level.options){		
		let j = level.options.indexOf(option)
		
		if (count<option.length){
			count = option.length
		}
	}
	let maxCount = count;
	console.log(`max chars for level ${r} is ${maxCount}, so that needs an angle proportional to  ${Math.round(maxCount/r)}`);
}
					
