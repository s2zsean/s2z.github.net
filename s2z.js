document.addEventListener('DOMContentLoaded', () => {
    const plaintextInput = document.getElementById('plaintextInput');
    const encryptionKey = document.getElementById('encryptionKey');
    const encryptButton = document.getElementById('encryptButton');
    const encryptedOutput = document.getElementById('encryptedOutput');

    const ciphertextInput = document.getElementById('ciphertextInput');
    const decryptionKey = document.getElementById('decryptionKey');
    const decryptButton = document.getElementById('decryptButton');
    const decryptedOutput = document.getElementById('decryptedOutput');

    encryptButton.addEventListener('click', () => {
        const text = plaintextInput.value;
        const key = encryptionKey.value;

        if (text && key) {
            // Using AES encryption from CryptoJS
            // IMPORTANT: In a real application, you'd want to derive a strong key
            // from the user's input using a KDF like PBKDF2, and use a proper IV.
            // This is a simplified example.
            const encrypted = CryptoJS.AES.encrypt(text, key).toString();
            encryptedOutput.value = encrypted;
            ciphertextInput.value = encrypted; // Automatically fill decrypt input
        } else {
            alert('Please enter both text and a key for encryption.');
        }
    });

    decryptButton.addEventListener('click', () => {
        const cipherText = ciphertextInput.value;
        const key = decryptionKey.value;

        if (cipherText && key) {
            try {
                // Using AES decryption from CryptoJS
                const decrypted = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
                decryptedOutput.value = decrypted;
            } catch (e) {
                alert('Decryption failed. Check your key or encrypted text.');
                console.error(e);
            }
        } else {
            alert('Please enter both encrypted text and a key for decryption.');
        }
    });
});