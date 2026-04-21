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

            table += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }

        table += '</tr>';
    }

    table += '</table>';
    content.innerHTML = table;
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

function handleClick(index, element) {
    if (fields[index] !== null) return;

    // Setze Wert im Array
    fields[index] = currentPlayer;

    // Setze Symbol direkt ins Feld
    if (currentPlayer === 'circle') {
        element.innerHTML = generateCircleSVG();
        currentPlayer = 'cross';
    } else {
        element.innerHTML = generateCrossSVG();
        currentPlayer = 'circle';
    }

    // Entferne onclick
    element.onclick = null;
}