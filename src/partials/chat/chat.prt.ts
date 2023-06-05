import styles from './chat.module.css'
//language=hbs
export default `
<div role="button" class="${styles['chat']}">
    <div class="${styles['chat__avatar']}">
        {{> avatar src=avatar small=true }}
    </div>
    <span class="${styles['chat__name']}">
        {{last_message.user.login}}
    </span>
    <p class="${styles['chat__message']}">
        {{last_message.content}}
    </p>
    <span class="${styles['chat__time']}">
        {{toLocalTime last_message.time}}
    </span>
    <span class="${styles['chat__new']}">
        {{unread_count}}
    </span>
</div>
`