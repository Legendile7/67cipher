// 18 characters that look like 6
const sixes = [
    '6', '６', '⑥', '❻', '➅', '➏', '𝟔', '𝟞', '𝟼', '⑹', 
    'б', ' ̷6', 'Ꮾ', '⒍', '⁶', '₆', '6️⃣', ' ̶6'
];

// 18 characters that look like 7
const sevens = [
    '7', '７', '⑦', '❼', '➆', '➐', '𝟕', '𝟟', '𝟽', '⑺', 
    '⁷', '₇', '⒎', ' ̷7', '˥', '٦', '7️⃣', ' ̶7'
];

// 36 Alphanumeric characters (0-9, a-z)
const sourceChars = "0123456789abcdefghijklmnopqrstuvwxyz";

const encodeMap = {};
const decodeMap = {};

// Build the maps
for (let i = 0; i < sourceChars.length; i++) {
    const source = sourceChars[i];
    
    let target;
    if (i % 2 === 0) {
        target = sixes[Math.floor(i / 2)];
    } else {
        target = sevens[Math.floor(i / 2)];
    }
    
    // Map lowercase
    encodeMap[source] = target;
    // Map uppercase to same target
    encodeMap[source.toUpperCase()] = target;
    
    // Map target back to lowercase source
    // Note: If there are duplicate targets, the last one wins.
    decodeMap[target] = source;
}

// Sort keys by length descending to ensure greedy matching (e.g. match '6️⃣' before '6')
const sortedDecodeKeys = Object.keys(decodeMap).sort((a, b) => b.length - a.length);

function encodeText() {
    const input = document.getElementById('inputText').value;
    if (!input) return;

    const chars = Array.from(input);
    const encodedChars = chars.map(char => {
        return encodeMap[char] || char;
    });
    
    const result = encodedChars.join('');
    document.getElementById('outputText').value = result;
}

function decodeText() {
    const input = document.getElementById('inputText').value;
    if (!input) return;

    let result = '';
    let i = 0;
    
    while (i < input.length) {
        let matchFound = false;
        
        // Try to match the longest known symbol first
        for (const key of sortedDecodeKeys) {
            if (input.startsWith(key, i)) {
                result += decodeMap[key];
                i += key.length;
                matchFound = true;
                break;
            }
        }
        
        if (!matchFound) {
            // If no match, just take the current character
            result += input[i];
            i++;
        }
    }

    document.getElementById('outputText').value = result;
}

function copyText() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    outputText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(outputText.value).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerText;
        btn.innerText = "COPIED! 🥶";
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
    });
}
