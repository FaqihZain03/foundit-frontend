import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { getItems } from "../../_services/items";
import ItemIndex from "./items/index";
import CreateItemForm from "./items/create";
import EditItemForm from "./items/edit";

import UserIndex from "./users/index";
import CreateUserForm from "./users/create";
import EditUserForm from "./users/edit";

import LocationIndex from "./locations/index";
import CreateLocationForm from "./locations/create";
import EditLocationForm from "./locations/edit";

import ClaimIndex from "./claims/index";
import CreateClaimForm from "./claims/create";
import EditClaimForm from "./claims/edit";

import CommentIndex from "./comments/index";
import CreateCommentForm from "./comments/create";
import EditCommentForm from "./comments/edit";

import "../../styles/Admin.css";
import { itemImageSTORAGE } from "../../_api";

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedMenu === "dashboard") {
      setLoading(true);
      const fetchItems = async () => {
        try {
          const data = await getItems();
          setItems(data);
        } catch (err) {
          setError("Gagal memuat data item.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchItems();
    }
  }, [selectedMenu]);

  const renderContent = () => {
    switch (selectedMenu) {
      // === Dashboard ===
      case "dashboard":
        return (
          <>
            <h1 className="admin-title">📦 Barang yang ditemukan</h1>
            {loading ? (
              <p>Memuat data...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="card-grid">
                {items.map((item) => (
                  <div key={item.id} className="item-card">
                    <img
                      src={
                        item.image_url?.startsWith("http")
                          ? item.image_url
                          : `${itemImageSTORAGE}/items/${item.image_url}`
                      }
                      alt={item.name}
                    />
                    <div className="content">
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                      <div className="footer">
                        <span className={`status ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                        <button onClick={() => setSelectedMenu("items")}>
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        );

      // === Item ===
      case "items":
        return (
          <ItemIndex
            setSelectedMenu={setSelectedMenu}
            setSelectedItem={setSelectedItem}
          />
        );
      case "create-item":
        return (
          <CreateItemForm
            user={{ id: 1 }} // Ganti sesuai user login
            onSuccess={() => setSelectedMenu("items")}
          />
        );
      case "edit-item":
        return (
          <EditItemForm
            item={selectedItem}
            onSuccess={() => {
              setSelectedMenu("items");
              setSelectedItem(null);
            }}
          />
        );

      // === User ===
      case "users":
        return (
          <UserIndex
            setSelectedMenu={setSelectedMenu}
            setSelectedItem={setSelectedItem}
          />
        );
      case "create-user":
        return (
          <CreateUserForm onSuccess={() => setSelectedMenu("users")} />
        );
      case "edit-user":
        return (
          <EditUserForm
            user={selectedItem}
            onSuccess={() => {
              setSelectedMenu("users");
              setSelectedItem(null);
            }}
          />
        );

      // === Location ===
      case "locations":
        return (
          <LocationIndex
            setSelectedMenu={setSelectedMenu}
            setSelectedItem={setSelectedItem}
          />
        );
      case "create-location":
        return (
          <CreateLocationForm onSuccess={() => setSelectedMenu("locations")} />
        );
      case "edit-location":
        return (
          <EditLocationForm
            location={selectedItem}
            onSuccess={() => {
              setSelectedMenu("locations");
              setSelectedItem(null);
            }}
          />
        );

      // === Claim ===
      case "claims":
        return (
          <ClaimIndex
            setSelectedMenu={setSelectedMenu}
            setSelectedItem={setSelectedItem}
          />
        );
      case "create-claim":
        return (
          <CreateClaimForm onSuccess={() => setSelectedMenu("claims")} />
        );
      case "edit-claim":
        return (
          <EditClaimForm
            claim={selectedItem}
            onSuccess={() => {
              setSelectedMenu("claims");
              setSelectedItem(null);
            }}
          />
        );

      // === Comment ===
      case "comments":
        return (
          <CommentIndex
            setSelectedMenu={setSelectedMenu}
            setSelectedItem={setSelectedItem}
          />
        );
      case "create-comment":
        return (
          <CreateCommentForm onSuccess={() => setSelectedMenu("comments")} />
        );
      case "edit-comment":
        return (
          <EditCommentForm
            comment={selectedItem}
            onSuccess={() => {
              setSelectedMenu("comments");
              setSelectedItem(null);
            }}
          />
        );

      // === Default ===
      default:
        return <p>Halaman tidak ditemukan</p>;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setSelectedMenu={setSelectedMenu} />
      <main className="admin-main">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
