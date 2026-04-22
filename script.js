let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    let content = document.getElementById('content');
    let table = '<table>';

    for (let i = 0; i < 3; i++) {
        table += '<tr>';

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }

            table += `<td onclick="handleClick(${index}, this)">
            <div class="cell">${symbol}</div>
            </td>`;
        }

        table += '</tr>';
    }

    table += '</table>';
    content.innerHTML = table;
}

function handleClick(index, element) {
    if (fields[index] !== null) return;

    // Setze Wert im Array
    fields[index] = currentPlayer;

    // Hole die .cell innerhalb des td
    let cell = element.firstElementChild;

    // Setze Symbol direkt ins Feld
    if (currentPlayer === 'circle') {
        cell.innerHTML = generateCircleSVG();
        currentPlayer = 'cross';
    } else {
        cell.innerHTML = generateCrossSVG();
        currentPlayer = 'circle';
    }

    // Entferne onclick
    element.onclick = null;

    // 🔥 Gewinner prüfen
    let winner = checkWinner();
    if (winner) {
        drawWinningLine(winner);

        // Optional: Spiel deaktivieren
        document.querySelectorAll('td').forEach(td => td.onclick = null);
    }
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle 
                cx="35" 
                cy="35" 
                r="30"
                fill="none"
                stroke="#00B0EF"
                stroke-width="5"
                stroke-dasharray="188.5"
                stroke-dashoffset="188.5">
                <animate 
                    attributeName="stroke-dashoffset"
                    from="188.5"
                    to="0"
                    dur="0.2s"
                    fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <!-- Linie 1 -->
            <line 
                x1="15" y1="15" 
                x2="55" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.5"
                stroke-dashoffset="56.5">
                <animate 
                    attributeName="stroke-dashoffset"
                    from="56.5"
                    to="0"
                    dur="0.2s"
                    fill="freeze" />
            </line>

            <!-- Linie 2 -->
            <line 
                x1="55" y1="15" 
                x2="15" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.5"
                stroke-dashoffset="56.5">
                <animate 
                    attributeName="stroke-dashoffset"
                    from="56.5"
                    to="0"
                    dur="0.2s"
                    begin="0.2s"
                    fill="freeze" />
            </line>
        </svg>
    `;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Reihen
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Spalten
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonalen
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (
            fields[a] &&
            fields[a] === fields[b] &&
            fields[a] === fields[c]
        ) {
            return pattern;
        }
    }

    return null;
}

function drawWinningLine(pattern) {
    const linePositions = {
        // Reihen
        "0,1,2": [0, 50, 300, 50],
        "3,4,5": [0, 150, 300, 150],
        "6,7,8": [0, 250, 300, 250],

        // Spalten
        "0,3,6": [50, 0, 50, 300],
        "1,4,7": [150, 0, 150, 300],
        "2,5,8": [250, 0, 250, 300],

        // Diagonalen
        "0,4,8": [0, 0, 300, 300],
        "2,4,6": [300, 0, 0, 300],
    };

    let key = pattern.toString();
    let [x1, y1, x2, y2] = linePositions[key];

    let svg = `
        <svg style="position:absolute; pointer-events:none;" width="300" height="300">
            <line 
                x1="${x1}" 
                y1="${y1}" 
                x2="${x2}" 
                y2="${y2}" 
                stroke="white" 
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="424"
                stroke-dashoffset="424">
                <animate 
                    attributeName="stroke-dashoffset"
                    from="424"
                    to="0"
                    dur="0.5s"
                    fill="freeze" />
            </line>
        </svg>
    `;

    document.getElementById('content').innerHTML += svg;
}

function restartGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    currentPlayer = 'circle';

    render();
}