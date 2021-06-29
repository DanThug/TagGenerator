const productNameList = document.querySelector('.product-name-list');
const paperContainer = document.querySelector('.paper-container');
const buttonResetPaperContainer = document.querySelector('.reset-paper-container');
const buttonPrintPaperContainer = document.querySelector('.print-paper-container');
const searchProducts = document.querySelector('.search-products');

const setProductNameList = () => {
    products.map(({title}) => title).sort().forEach((product, index) => {
        const item = `<li data-name="product-name" data-product-index="${index}" class="list-group-item">${product}</li>`
        productNameList.insertAdjacentHTML('beforeend', item);
    });
}

const setProductIndex = () => {
    const tags = document.querySelectorAll('[data-tag-index]');
    Array.from(tags).forEach((tag, index) => tag.dataset.tagIndex = index);
}

const insertTagOnContainer = (productObject) => {
    const newTag = `<div class="tag tag-border fadeOut">
                        <img data-tag="remove" src="${productObject.path}">
                        <label>${productObject.title}<div class="fa fa-trash remove"></div></label>
                    </div>`;
    paperContainer.insertAdjacentHTML('afterbegin', newTag);
    document.querySelector('.tag').classList.add('fadeIn');
    setProductIndex();

    setTimeout(() => {
        document.querySelector('.tag').classList.remove('fadeOut');
    }, 500);
}

const removeTagOfContainer = tagTarget => {
    tagTarget.classList.remove('fadeIn');
    tagTarget.classList.add('fadeOut');
    
    setTimeout(() => {
        tagTarget.parentElement.remove();
    }, 1000);
}

const searchProduct = inputValue => {
    Array.from(productNameList.children).forEach(product => {
        const match = product.textContent.toLowerCase().includes(inputValue.toLowerCase());
        
        if (!match) {
            product.classList.add('hide'); 
            return; 
        }

        product.classList.remove('hide');
    });
}

setProductNameList();

// LISTENERS
productNameList.addEventListener('click', ({ target }) => {
    const isAProductName = target.dataset.name === 'product-name';

    if (isAProductName) {
        const productObject = products.find(({title}) => title === target.textContent);
        const productIndex = target.dataset.productIndex;
        insertTagOnContainer(productObject, productIndex);
    }
});

paperContainer.addEventListener('click', ({ target }) => {
    const isATag = target.dataset.tag === 'remove';

    if (isATag) {
        removeTagOfContainer(target);
    }
});

buttonPrintPaperContainer.addEventListener('click', () => {
    print();
});

buttonResetPaperContainer.addEventListener('click', () => {
    paperContainer.textContent = '';
});

searchProducts.addEventListener('input', ({ target }) => {
    searchProduct(target.value);
});