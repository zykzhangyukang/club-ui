<template>
    <GlobalFooter class="footer" :links="links" :copyright="copyright" />
</template>

<script>
    export default {
        data () {
            return {
                links: [
                    {
                        key: '帮助',
                        title: '帮助',
                        href: 'https://www.coderman.love',
                        blankTarget: true
                    },
                    {
                        key: 'github',
                        icon: 'logo-github',
                        href: 'https://github.com/zykzhangyukang',
                        blankTarget: true
                    },
                    {
                        key: '条款',
                        title: '条款',
                        href: '',
                        blankTarget: true
                    }
                ],
                copyright: 'Copyright © 2024 Club All Rights Reserved'
            }
        }
    }
</script>

<style scoped>

</style>