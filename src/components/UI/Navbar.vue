<template>
    <div>
        <header
            class="navbar navbar-horizontal navbar-expand navbar-dark flex-row align-items-md-center ct-navbar bg-primary py-2"
        >
            <a
                class="navbar-brand mr-0 mr-md-2 ml-0 ml-md-2"
                href="../../index.html"
                aria-label="Bootstrap"
            >
                <img src="@/assets/brand/logo.png" style="40px" />
            </a>
            <ul class="navbar-nav flex-row mr-auto ml-4 d-none d-md-flex">
                <li class="nav-item">
                    <a class="nav-link" href="../../index.html">Preview</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="" rel="nofollow" target="_blank"
                        >Support</a
                    >
                </li>
            </ul>
            <div class="d-none d-sm-block ml-auto">
                <ul
                    class="navbar-nav ct-navbar-nav flex-row align-items-center"
                >
                    <li class="nav-item">
                        <a
                            class="nav-link nav-link-icon"
                            href=""
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab fa-facebook-square"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link nav-link-icon"
                            href="https://twitter.com"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link nav-link-icon"
                            href="https://www.instagram.com"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link nav-link-icon"
                            href="https://dribbble.com"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab fa-dribbble"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link nav-link-icon"
                            href="https://github.com"
                            rel="nofollow"
                            target="_blank"
                        >
                            <i class="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <li class="nav-item d-none d-lg-block ml-lg-4">
                <a href="" target="_blank" class="btn btn-neutral btn-icon">
                    <span class="btn-inner--icon">
                        <i class="fa fa-shopping-cart"></i>
                    </span>
                    <span class="nav-link-inner--text">Something</span>
                </a>
            </li>
            <button
                class="navbar-toggler ct-search-docs-toggle d-block d-md-none ml-auto ml-sm-0"
                type="button"
                data-toggle="collapse"
                data-target="#ct-docs-nav"
                aria-controls="ct-docs-nav"
                aria-expanded="false"
                aria-label="Toggle docs navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
        </header>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
