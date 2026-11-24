import { useT } from '../i18n/useT';

const CustomToolbar = () => {
  const { sizes } = useT().editor;
  return (
    <div id="toolbar">
      <select className="ql-size" defaultValue="">
        <option value="10px">{sizes.small}</option>
        <option value="">{sizes.normal}</option>
        <option value="32px">{sizes.big}</option>
        <option value="50px">{sizes.huge}</option>
      </select>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" defaultValue="">
          <option value="center" />
          <option value="left" />
          <option value="right" />
          <option value="justify" />
        </select>
      </span>

      <span className="ql-formats">
        <select className="ql-color" defaultValue=""></select>
        <select className="ql-background" defaultValue=""></select>
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
      </span>
      <span className="ql-formats">
        <button className="ql-clean" />
      </span>
    </div>
  );
};

export default CustomToolbar;
