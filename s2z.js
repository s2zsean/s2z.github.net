document.addEventListener('DOMContentLoaded', () => {
    const plaintextInput = document.getElementById('plaintextInput');
    const encryptionKey = document.getElementById('encryptionKey');
    const encryptButton = document.getElementById('encryptButton');
    const encryptedOutput = document.getElementById('encryptedOutput');

    const ciphertextInput = document.getElementById('ciphertextInput');
    const decryptionKey = document.getElementById('decryptionKey');
    const decryptButton = document.getElementById('decryptButton');
    const decryptedOutput = document.getElementById('decryptedOutput');

    const typeText = (element, text, delay = 15) => {
        element.value = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.value += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                element.classList.remove('typing');
                element.classList.add('pop-in');
                setTimeout(() => element.classList.remove('pop-in'), 500);
            }
        }, delay);
    };

    const addTypingAnimation = (element) => {
        element.classList.add('typing');
    };


    encryptButton.addEventListener('click', () => {
        const text = plaintextInput.value;
        const key = encryptionKey.value;

        if (text && key) {
            try {
                addTypingAnimation(encryptedOutput);
                const encrypted = CryptoJS.AES.encrypt(text, key).toString();
                typeText(encryptedOutput, encrypted);
                
                setTimeout(() => {
                    ciphertextInput.value = encrypted;
                    ciphertextInput.classList.add('pop-in');
                    setTimeout(() => ciphertextInput.classList.remove('pop-in'), 500);
                }, 700);
            } catch (e) {
                alert('Encryption failed. Please check your input.');
                console.error(e);
                encryptedOutput.value = 'Error encrypting.';
            }
        } else {
            alert('Please enter both text and a key for encryption.');
        }
    });

    decryptButton.addEventListener('click', () => {
        const cipherText = ciphertextInput.value;
        const key = decryptionKey.value;

        if (cipherText && key) {
            try {
                addTypingAnimation(decryptedOutput);
                const decrypted = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
                
                if (decrypted.length === 0 && cipherText.length > 0) {
                     throw new Error("Empty decryption result. Likely wrong key or invalid ciphertext.");
                }

                typeText(decryptedOutput, decrypted);
            } catch (e) {
                alert('Decryption failed. Check your key or encrypted text. It might be corrupted or the key is wrong.');
                console.error(e);
                decryptedOutput.value = 'Error decrypting. Check key.';
            }
        } else {
            alert('Please enter both encrypted text and a key for decryption.');
        }
    });
});
