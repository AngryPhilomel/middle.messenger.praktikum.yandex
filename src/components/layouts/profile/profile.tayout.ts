import styles from "./profile.module.css";

export const tmpl = () => `
            <main class="${styles["profile-layout"]}">
                <div class="${styles["profile-layout__back"]}">
                    {{{backButton}}}
                </div>
                <div class="${styles["profile-layout__avatar"]}">
                    {{{avatar}}}
                </div>
                {{{form}}}
            </main>
`;

// <form>
//     {{{inputs}}}
// <div class="${styles["profile-layout__buttons"]}">
// {{{buttons}}}
// </div>
// </form>

export default tmpl;
