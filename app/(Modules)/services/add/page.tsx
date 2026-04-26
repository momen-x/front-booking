import AddServiceForm from "../_Components/add-or-update-service-form";

const AddServicePage = () => {
  return (
    <div className="w-[50%] m-auto">
      <AddServiceForm
        goal="Add New Service"
        description="Create a new service offering for your customers"
      />
    </div>
  );
};

export default AddServicePage;
