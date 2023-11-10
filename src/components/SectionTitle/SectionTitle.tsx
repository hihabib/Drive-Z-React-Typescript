import classes from './SectionTitle.module.css'
interface SectionTitleProps {
    title: string
}
const SectionTitle = ({title}:SectionTitleProps) => {
    return (
        <h3 className={classes.sectionTitle}>{title}</h3>
    );
};

export default SectionTitle;