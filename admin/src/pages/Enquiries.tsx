import { useEffect, useState } from 'react';
import type { Enquiry } from '../../../common/types';
import { getJSON, delJSON } from '../lib/api';

export default function Enquiries() {
  const [list, setList] = useState<Enquiry[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    getJSON<Enquiry[]>('/enquiries').then(setList);
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Enquiries</h1>
        <p className="page-subtitle">View and manage customer enquiries</p>
        <button className="btn">Filter</button>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {list.map((e) => (
          <div key={e._id} className="card" style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{e.subject}</div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>
                  {e.companyName} • {e.contactPerson} • {e.email}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>{e.date ? new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</div>
            </div>
            {openId === e._id && (
              <div style={{ marginTop: 8, padding: 12, backgroundColor: '#f9fafb', borderRadius: 6, fontSize: 14, color: '#374151' }}>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>Subject:</span> {e.subject}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Company:</span> {e.companyName}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Contact Person:</span> {e.contactPerson}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Email:</span> {e.email}
                  </div>
                  {e.file && (
                     <div>
                       <span style={{ fontWeight: 600 }}>Attachment:</span>{' '}
                       <a 
                         href={`http://localhost:5000${e.file}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         style={{ color: '#2563EB', textDecoration: 'underline' }}
                       >
                         {e.file.split('/').pop() || 'View Resume / Document'}
                       </a>
                     </div>
                   )}
                  <div>
                    <span style={{ fontWeight: 600 }}>Message:</span>
                    <div style={{ marginTop: 4, whiteSpace: 'pre-wrap' }}>{e.message}</div>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              {e.file && (
                <a 
                  className="btn" 
                  href={`http://localhost:5000${e.file}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  View Attachment
                </a>
              )}
              <a className="btn primary" href={`mailto:${e.email}?subject=Re: ${encodeURIComponent(e.subject)}`}>Respond</a>
              <button className="btn" onClick={() => setOpenId(openId === e._id ? null : e._id!)}>
                {openId === e._id ? 'Hide Details' : 'View Details'}
              </button>
              <button
                className="btn"
                onClick={async () => {
                  if (!confirm('Delete this enquiry?')) return;
                  await delJSON(`/enquiries/${e._id}`);
                  const refreshed = await getJSON<Enquiry[]>('/enquiries');
                  setList(refreshed);
                }}
                style={{ color: '#DC2626' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
