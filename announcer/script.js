function toggleSourceFields() {
    document.getElementById("sourceFields").style.display = document.getElementById("toggleSource").checked ? "block" : "none";
}

function toggleRoleFields() {
    document.getElementById("roleFields").style.display = document.getElementById("toggleRoles").checked ? "block" : "none";
}

function generateOutput() {
    let text = document.getElementById("articleText").value.trim();
    let separator = "​||||".repeat(100); // Invisible separator

    // Clear previous error messages
    document.getElementById("articleTextMessage").style.display = 'none';
    document.getElementById("pingRolesMessage").style.display = 'none';
    document.getElementById("sourceMessage").style.display = 'none';

    let formattedText = "";

    // Check if article text is filled
    if (!text) {
        document.getElementById("articleTextMessage").style.display = 'block';
        return "";
    }

    formattedText += `${text}`;

    // Check source fields if source is toggled
    if (document.getElementById("toggleSource").checked) {
        let sourceName = document.getElementById("sourceName").value.trim();
        let sourceLink = document.getElementById("sourceLink").value.trim();

        if (sourceLink && !sourceName) {
            document.getElementById("sourceMessage").textContent = `Article text\n\nSource: Enter source name here capitalized.`;
            document.getElementById("sourceMessage").style.display = 'block';
            return "";
        } else if (!sourceLink && sourceName) {
            document.getElementById("sourceMessage").textContent = `Article text\n\nSource: Enter source link.`;
            document.getElementById("sourceMessage").style.display = 'block';
            return "";
        }

        if (sourceName && sourceLink) {
            formattedText += `\n\nsource: **[${sourceName}](${sourceLink})**`;
        }
    }

    // Check if Ping roles are selected
    if (document.getElementById("toggleRoles").checked) {
        let selectedRoles = document.querySelectorAll('input[name="role"]:checked');
        let roleMentions = Array.from(selectedRoles).map(role => role.value).join(' ');
        if (!roleMentions) {
            document.getElementById("pingRolesMessage").style.display = 'block';
            return "";
        }
        formattedText += ` ${separator} ${roleMentions}`;
    }

    return formattedText;
}

function copyToClipboard() {
    let formattedText = generateOutput();
    if (formattedText) {
        navigator.clipboard.writeText(formattedText).then(() => {
            let button = document.getElementById("copyButton");
            button.textContent = "Copied to Clipboard";
            setTimeout(() => button.textContent = "Copy to Clipboard", 2000);
        });
    }
}