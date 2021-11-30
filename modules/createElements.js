export  function createStickyPopups({id,region,city,tempeture,weather,shortDescription}){
return /*html*/`
    <li class="col">
        <div
        class="sticky-popup open_sticky_popup popup-content-bounce-in-up" data-id="${id}">
        <div class="popup-header">
            <span class="popup-title fs-4">
            <div class="
                d-flex
                justify-content-between
                align-items-center
                px-6
                py-4">
                <h2 class="fs-2">${region}</h2>
                <div class="dot-menu">
                <div class="dot dot1"></div>
                <div class="dot line1"></div>
                <div class="dot line2"></div>
                <div class="dot dot2"></div>
                </div>
            </div>
            </span>
        </div>
        <div class="popup-content-trapezoid"></div>
        <div class="popup-content">
            <div class="border border-2 border-dark px-6 py-6">
            <button class="btn btn-lg btn-yellow border lh-sm text-black mb-2">${tempeture}&#8451;</button>
            <h3 class="fs-l mb-1">${weather}</h3>
            <span class="d-block text-muted fs-5 mb-6">${city}今日早上</span>
            <p class="mb-6 popup-body fw-6">
                ${shortDescription}
            </p>
            <button
                class="btn btn-secondary w-100 rounded-0 border border-1">
                <span class="align-middle text-black">選城市</span>
                <svg
                width="43"
                height="18"
                viewBox="0 0 43 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 9.16699H40.8333"
                    stroke="#131313"
                    stroke-width="1.5"/>
                <path
                    d="M42.0004 9.40023C39.0448 9.78912 33.0871 11.9669 32.9004 17.5669"
                    stroke="#131313"
                    stroke-width="1.5"/>
                <path
                    d="M42.0004 9.16667C39.0448 8.77778 33.0871 6.6 32.9004 1"
                    stroke="#131313"
                    stroke-width="1.5"/>
                </svg>
            </button>
            </div>
        </div>
        </div>
    </li>
    `
}


